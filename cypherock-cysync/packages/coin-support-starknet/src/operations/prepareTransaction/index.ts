import { getAccountAndCoin } from '@cypherock/coin-support-utils';
import { starknetCoinList } from '@cypherock/coins';
import { assert, BigNumber } from '@cypherock/cysync-utils';
import { IAccount } from '@cypherock/db-interfaces';

import { IPrepareStarknetTransactionParams } from './types';

import { estimateFee } from '../../services';
import { IPreparedStarknetTransaction } from '../transaction';
import { validateAddress } from '../validateAddress';

const validateAddresses = (params: IPrepareStarknetTransactionParams) => {
  const outputAddressValidation: boolean[] = [];

  for (const output of params.txn.userInputs.outputs) {
    let isValid = true;

    /**
     * We allow empty string in the validation (error prompt should not
     * appear for empty string). And validate only non-empty strings.
     */
    if (output.address && !validateAddress(output.address)) {
      isValid = false;
    }

    outputAddressValidation.push(isValid);
  }

  return outputAddressValidation;
};

export const prepareTransaction = async (
  params: IPrepareStarknetTransactionParams,
): Promise<IPreparedStarknetTransaction> => {
  const { txn } = params;
  if (txn.userInputs.txnType !== 'deploy') {
    assert(
      txn.userInputs.outputs.length === 1,
      new Error('Starknet transaction requires exactly 1 output'),
    );
  }

  const resp = {
    ...txn,
    validation: {
      outputs: [true],
      hasEnoughBalance: true,
      isValidFee: true,
    },
    computedData: {
      maxFee: '',
      output: txn.userInputs.outputs[0],
      data: '0x',
    },
  };
  return resp;
};
