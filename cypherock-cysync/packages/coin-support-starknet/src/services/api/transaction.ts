import {
  IPreparedStarknetTransaction,
  IStarknetAccount,
} from '../../operations/types';
import logger from '../../utils/logger';
import { config } from '../../config';

const contractAXclassHash =
  '0x01a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003';
const ethContractAddress =
  '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';
// const strkContractAddress =
//   '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';

const nodeUrl = `https://starknet-goerli.infura.io/v3/${config.INFURA_STARKNET_API_KEY}`;
let provider: any = null;

export const getTransactions = async (
  address: string,
  assetId: string,
  from?: number,
  limit?: number,
) => {
  logger.verbose({ address, assetId, from, limit });
  console.log('\nTransaction history not implemented\n');
  return {
    transactions: {},
    hasMore: false,
  };
};

export const broadcastTransactionToBlockchain = async (
  transaction: IPreparedStarknetTransaction,
  account: IStarknetAccount,
  signature: string,
): Promise<string> => {
  logger.verbose({transaction, account, signature});
  return '';
};

export const estimateFee = async (action: 'deploy' | 'transfer') => {
  let resp;
  if (action === 'transfer') {
    resp = { suggestedMaxFee: '0x8110e6d36a8' };
  } else {
    resp = { suggestedMaxFee: '0x8110e6d36a8' };
  }

  return resp;
};
