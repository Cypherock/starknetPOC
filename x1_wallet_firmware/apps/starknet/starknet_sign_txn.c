/**
 * @file    starknet_txn.c
 * @author  Cypherock X1 Team
 * @brief   Source file to handle transaction signing logic for Starknet
 *protocol
 *
 * @copyright Copyright (c) 2023 HODL TECH PTE LTD
 * <br/> You may obtain a copy of license at <a href="https://mitcc.org/"
 *target=_blank>https://mitcc.org/</a>
 *
 ******************************************************************************
 * @attention
 *
 * (c) Copyright 2023 by HODL TECH PTE LTD
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject
 * to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
 * ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 * "Commons Clause" License Condition v1.0
 *
 * The Software is provided to you by the Licensor under the License,
 * as defined below, subject to the following condition.
 *
 * Without limiting other conditions in the License, the grant of
 * rights under the License will not include, and the License does not
 * grant to you, the right to Sell the Software.
 *
 * For purposes of the foregoing, "Sell" means practicing any or all
 * of the rights granted to you under the License to provide to third
 * parties, for a fee or other consideration (including without
 * limitation fees for hosting or consulting/ support services related
 * to the Software), a product or service whose value derives, entirely
 * or substantially, from the functionality of the Software. Any license
 * notice or attribution required by the License must also include
 * this Commons Clause License Condition notice.
 *
 * Software: All X1Wallet associated files.
 * License: MIT
 * Licensor: HODL TECH PTE LTD
 *
 ******************************************************************************
 */

/*****************************************************************************
 * INCLUDES
 *****************************************************************************/

#include "reconstruct_wallet_flow.h"
#include "starknet_api.h"
#include "starknet_context.h"
#include "starknet_helpers.h"
#include "starknet_priv.h"
#include "status_api.h"
#include "ui_core_confirm.h"
#include "ui_screens.h"
#include "wallet_list.h"

/*****************************************************************************
 * EXTERN VARIABLES
 *****************************************************************************/

/*****************************************************************************
 * PRIVATE MACROS AND DEFINES
 *****************************************************************************/

/*****************************************************************************
 * PRIVATE TYPEDEFS
 *****************************************************************************/

/*****************************************************************************
 * STATIC FUNCTION PROTOTYPES
 *****************************************************************************/

/**
 * @brief Checks if the provided query contains expected request.
 * @details The function performs the check on the request type and if the check
 * fails, then it will send an error to the host bitcoin app and return false.
 *
 * @param query Reference to an instance of starknet_query_t containing query
 * received from host app
 * @param which_request The expected request type enum
 *
 * @return bool Indicating if the check succeeded or failed
 * @retval true If the query contains the expected request
 * @retval false If the query does not contain the expected request
 */
static bool check_which_request(const starknet_query_t *query,
                                pb_size_t which_request);

/**
 * @brief The function prepares and sends empty responses
 *
 * @param which_response Constant value for the response type to be sent
 */
static void send_response(const pb_size_t which_response);

/**
 * @brief Validates the derivation path received in the request from host
 * @details The function validates the provided account derivation path in the
 * request. If invalid path is detected, the function will send an error to the
 * host and return false.
 *
 * @param request Reference to an instance of starknet_sign_txn_request_t
 * @return bool Indicating if the verification passed or failed
 * @retval true If all the derivation path entries are valid
 * @retval false If any of the derivation path entries are invalid
 */
static bool validate_request_data(const starknet_sign_txn_request_t *request);

/**
 * @brief Takes already received and decoded query for the user confirmation.
 * @details The function will verify if the query contains the
 * STARKNET_SIGN_TXN_REQUEST_INITIATE_TAG type of request. Additionally, the
 * wallet-id is validated for sanity and the derivation path for the account is
 * also validated. After the validations, user is prompted about the action for
 * confirmation. The function returns true indicating all the validation and
 * user confirmation was a success. The function also duplicates the data from
 * query into the starknet_txn_context  for further processing.
 *
 * @param query Constant reference to the decoded query received from the host
 *
 * @return bool Indicating if the function actions succeeded or failed
 * @retval true If all the validation and user confirmation was positive
 * @retval false If any of the validation or user confirmation was negative
 */
static bool handle_initiate_query(const starknet_query_t *query);

/**
 * @brief Receives unsigned txn from the host. If reception is successful, it
 * also parses the txn to ensure it's validity.
 * @note In case of any failure, a corresponding message is conveyed to the host
 *
 * @param query Reference to buffer of type starknet_query_t
 * @return true If the txn is received in the internal buffers and is valid
 * @return false If the txn could not be received or it's validation failed
 */
static bool fetch_valid_input(starknet_query_t *query);

/**
 * @brief This function executes user verification flow of the unsigned txn
 * received from the host.
 * @details The user verification flow is different for different type of action
 * types identified from the unsigned txn
 * @note This function expected that the unsigned txn is parsed using the helper
 * function as only few action types are supported currently.
 *
 * @return true If the user accepted the transaction display
 * @return false If any user rejection occured or P0 event occured
 */
static bool get_user_verification(void);

/**
 * @brief Calculates ED25519 curve based signature over the digest of the user
 * verified unsigned txn.
 * @details Seed reconstruction takes place within this function
 *
 * @param signature_buffer Reference to buffer where the signature will be
 * populated
 * @return true If the signature was computed successfully
 * @return false If signature could not be computed - maybe due to some error
 * during seed reconstruction phase
 */
static bool sign_txn(uint8_t *signature_buffer);

/**
 * @brief Sends signature of the STARKNET unsigned txn to the host
 * @details The function waits for the host to send a request of type
 * STARKNET_SIGN_TXN_REQUEST_SIGNATURE_TAG and sends the response
 *
 * @param query Reference to buffer of type starknet_query_t
 * @param signature Reference to signature to be sent to the host
 * @return true If the signature was sent successfully
 * @return false If the signature could not be sent - maybe due to and P0 event
 * or invalid request received from the host
 */
static bool send_signature(starknet_query_t *query, const uint8_t *signature);

/*****************************************************************************
 * STATIC VARIABLES
 *****************************************************************************/
static starknet_txn_context_t *starknet_txn_context = NULL;

/*****************************************************************************
 * GLOBAL VARIABLES
 *****************************************************************************/

/*****************************************************************************
 * STATIC FUNCTIONS
 *****************************************************************************/
static bool check_which_request(const starknet_query_t *query,
                                pb_size_t which_request) {
  if (which_request != query->sign_txn.which_request) {
    starknet_send_error(ERROR_COMMON_ERROR_CORRUPT_DATA_TAG,
                        ERROR_DATA_FLOW_INVALID_REQUEST);
    return false;
  }

  return true;
}

static void send_response(const pb_size_t which_response) {
  starknet_result_t result = init_starknet_result(STARKNET_RESULT_SIGN_TXN_TAG);
  result.sign_txn.which_response = which_response;
  starknet_send_result(&result);
}

static bool validate_request_data(const starknet_sign_txn_request_t *request) {
  bool status = true;

  if (!starknet_derivation_path_guard(
          request->initiate.derivation_path,
          request->initiate.derivation_path_count)) {
    starknet_send_error(ERROR_COMMON_ERROR_CORRUPT_DATA_TAG,
                        ERROR_DATA_FLOW_INVALID_DATA);
    status = false;
  }
  return status;
}

static bool handle_initiate_query(const starknet_query_t *query) {
  return true;
}

static bool fetch_valid_input(starknet_query_t *query) {
  return false;
}

static bool get_user_verification(void) {
  bool user_verified = false;
  return user_verified;
}

static bool sign_txn(uint8_t *signature_buffer) {
  return true;
}

static bool send_signature(starknet_query_t *query, const uint8_t *signature) {
  return true;
}

/*****************************************************************************
 * GLOBAL FUNCTIONS
 *****************************************************************************/

void starknet_sign_transaction(starknet_query_t *query) {
  starknet_txn_context =
      (starknet_txn_context_t *)malloc(sizeof(starknet_txn_context_t));
  memzero(starknet_txn_context, sizeof(starknet_txn_context_t));

  uint8_t signature[64] = {0};
  memzero(signature, sizeof(signature));

  if (handle_initiate_query(query) && fetch_valid_input(query) &&
      get_user_verification() && sign_txn(signature) &&
      send_signature(query, (const uint8_t *)signature)) {
    delay_scr_init(ui_text_check_cysync, DELAY_TIME);
  }

  memzero(signature, sizeof(signature));

  if (starknet_txn_context) {
    free(starknet_txn_context);
    starknet_txn_context = NULL;
  }

  return;
}