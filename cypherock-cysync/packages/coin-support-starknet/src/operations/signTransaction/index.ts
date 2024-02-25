import { SignTransactionDeviceEvent } from '@cypherock/coin-support-interfaces';
import {
  makeSignTransactionsObservable,
  mapDerivationPath,
  SignTransactionFromDevice,
} from '@cypherock/coin-support-utils';
import { IStarknetCoinInfo } from '@cypherock/coins';
import { IAccount } from '@cypherock/db-interfaces';
import { StarknetApp, ISignTxnParams } from '@cypherock/sdk-app-starknet';
import { assert, hexToUint8Array } from '@cypherock/sdk-utils';
import { Observable } from 'rxjs';

import {
  ISignStarknetTransactionParams,
  ISignStarknetTransactionEvent,
  signStarknetToDeviceEventMap,
} from './types';

import { createApp } from '../../utils';
import logger from '../../utils/logger';
import { IPreparedStarknetTransaction } from '../transaction';
import { getStarknetApiJs } from '@cypherock/sdk-app-starknet/dist/utils';
import { BigNumber } from '@cypherock/cysync-utils';
import { config } from '../../config';

const nodeUrl = `https://starknet-goerli.infura.io/v3/${config.INFURA_STARKNET_API_KEY}`;
let provider: any = null;

const prepareUnsignedTxn = async (
  transaction: IPreparedStarknetTransaction,
  coin: IStarknetCoinInfo,
  account: IAccount,
): Promise<ISignTxnParams['txn']> => {
  logger.verbose({transaction, coin, account});
  return '';
};

const signTransactionFromDevice: SignTransactionFromDevice<
  StarknetApp
> = async params => {
  const { app, observer, transaction, account, coin } = params;
  logger.info({ transaction });

  const events: Record<SignTransactionDeviceEvent, boolean | undefined> =
    {} as any;

  const txn = await prepareUnsignedTxn(
    transaction as IPreparedStarknetTransaction,
    coin as IStarknetCoinInfo,
    account,
  );
  const { serializedTxn } = await app.signTxn({
    walletId: hexToUint8Array(account.walletId),
    derivationPath: mapDerivationPath(account.derivationPath),
    txn,
    onEvent: event => {
      const deviceEvent = signStarknetToDeviceEventMap[event];
      if (deviceEvent !== undefined) {
        events[deviceEvent] = true;
      }

      observer.next({ type: 'Device', device: { isDone: false, events } });
    },
  });

  observer.next({ type: 'Device', device: { isDone: true, events } });

  assert(serializedTxn, new Error('Failed to sign transaction'));

  return serializedTxn;
};

export const signTransaction = (
  params: ISignStarknetTransactionParams,
): Observable<ISignStarknetTransactionEvent> =>
  makeSignTransactionsObservable<StarknetApp, ISignStarknetTransactionEvent>({
    ...params,
    signTransactionFromDevice,
    createApp,
  });
