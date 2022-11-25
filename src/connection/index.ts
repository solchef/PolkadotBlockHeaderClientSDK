const { ApiPromise } = require("@polkadot/api");
const {
  ScProvider,
  WellKnownChain,
} = require("@polkadot/rpc-provider/substrate-connect");
import type {} from "@polkadot/types/interfaces";

export const ChainConnection = async () => {
  const provider = new ScProvider(WellKnownChain.westend2);
  await provider.connect();
  const activeConnection = await ApiPromise.create({ provider });

  return activeConnection;
};
