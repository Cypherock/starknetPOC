import DeviceConnection, {
  updateLogger as updateLoggerHid,
} from '@cypherock/sdk-hw-hid';
import DeviceConnectionSerialport from '@cypherock/sdk-hw-serialport';
import { IWalletItem, ManagerApp, updateLogger } from '@cypherock/sdk-app-manager';
import { updateLogger as updateLoggerCore } from '@cypherock/sdk-core';
import { IDeviceConnection } from '@cypherock/sdk-interfaces';
import * as bitcoinJsLib from 'bitcoinjs-lib';
import * as nearApiJs from 'near-api-js';
import * as solanaWeb3 from '@solana/web3.js';
import * as starknetApiJs from 'starknet';
import { setBitcoinJSLib } from '@cypherock/sdk-app-btc';
import { setEthersLib } from '@cypherock/sdk-app-evm';
import { setNearApiJs } from '@cypherock/sdk-app-near';
import { setSolanaWeb3 } from '@cypherock/sdk-app-solana';
import { setStarknetApiJs, StarknetApp } from '@cypherock/sdk-app-starknet';
import { ethers } from 'ethers';
import { createServiceLogger } from './logger';
import dotEnv from 'dotenv-flow';

dotEnv.config();
const getEnvVariable = (key: string, defaultValue?: string): string => {
  let value: string | undefined;

  if (typeof process !== 'undefined' && process.env) {
    value = process.env[key];
  } else if (typeof window !== 'undefined' && (window as any).cysyncEnv) {
    value = (window as any).cysyncEnv[key];
  }

  if (value) return value;
  if (defaultValue) return defaultValue;

  throw new Error(`ENVIREMENT VARIABLE '${key}' NOT SPECIFIED.`);
};

const provider = new starknetApiJs.RpcProvider({ nodeUrl: `https://starknet-goerli.infura.io/v3/${getEnvVariable('INFURA_STARKNET_API_KEY', '')}` });
const contractAXclassHash = "0x01a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003";
const ethContractAddress = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';
const strkContractAddress = '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';
const index = 0;

const contracts: {eth: starknetApiJs.Contract | null, strk: starknetApiJs.Contract | null} = {eth: null, strk: null};

function formatBalance(qty: bigint, decimals: number): string {
  const balance = String("0").repeat(decimals) + qty.toString();
  const rightCleaned = balance.slice(-decimals).replace(/(\d)0+$/gm, '$1');
  const leftCleaned = BigInt(balance.slice(0, balance.length - decimals)).toString();
  return leftCleaned + "." + rightCleaned;
}

async function initContracts() {
  if (!contracts['eth']) {
    contracts['eth'] = new starknetApiJs.Contract((await provider.getClassAt(ethContractAddress)).abi, ethContractAddress, provider);
  }

  if (!contracts['strk']) {
    contracts['strk'] = new starknetApiJs.Contract((await provider.getClassAt(strkContractAddress)).abi, strkContractAddress, provider);
  }
}

// ================ Starknet App -- Account balance and state ========== //
async function fetchBalances(accountAXAddress: string) {
  await initContracts();
  const ethBalance = await (contracts.eth!).balanceOf(accountAXAddress) as bigint;
  const strkBalance = await (contracts.strk!).balanceOf(accountAXAddress) as bigint;

  return [formatBalance(ethBalance, 18) + " ETH", formatBalance(strkBalance, 18) + " STRK"];
}

// ================ Starknet App -- Account fetching ========== //
async function fetchAccount(connection: IDeviceConnection) {
  const managerApp = await ManagerApp.create(connection);

  const wallet = (await managerApp.getWallets()).walletList[0];
  // TODO: Give choice to user for wallet name & account number

  const starkApp = await StarknetApp.create(connection);
  const starkKeyPubAX = (await starkApp.getPublicKeys({
    walletId: wallet.id,
    derivationPaths: [{ path: [0x80000000 + 44, 0x80000000 + 9004, 0x80000000, 0, index] }]
  })).publicKeys[0];

  const constructorAXCallData = starknetApiJs.CallData.compile([starkKeyPubAX,0]);
  const accountAXAddress = starknetApiJs.hash.calculateContractAddressFromHash(starkKeyPubAX, contractAXclassHash, constructorAXCallData, 0);
  console.log("Your Starknet address is : ", {accountAXAddress});

  // TODO: Give choice to user
  return {accountAXAddress, starkKeyPubAX, wallet};
}

const run = async () => {
  updateLogger(createServiceLogger);
  updateLoggerCore(createServiceLogger);
  updateLoggerHid(createServiceLogger);

  setBitcoinJSLib(bitcoinJsLib);
  setEthersLib(ethers);
  setNearApiJs(nearApiJs);
  setSolanaWeb3(solanaWeb3);
  setStarknetApiJs(starknetApiJs);

  let connection: IDeviceConnection;

  try {
    connection = await DeviceConnection.create();
  } catch (error) {
    connection = await DeviceConnectionSerialport.create();
  }

  const {accountAXAddress, wallet} = await fetchAccount(connection);
  console.log(await fetchBalances(accountAXAddress));
  connection.destroy();
};

run();
