const { ApiPromise } = require('@polkadot/api');
const { ScProvider, WellKnownChain } = require('@polkadot/rpc-provider/substrate-connect');

async function main () {
  // const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const provider = new ScProvider(WellKnownChain.westend2);
  await provider.connect()

  const api = await ApiPromise.create({ provider });

  let count = 0;
  const unsubscribe = await api.rpc.chain.subscribeNewHeads((header: { hash: any; }) => {
    console.log(`Chain is at block: #${header.hash}`);
    if (++count === 256) {
      unsubscribe();
      process.exit(0);
    }
  });
}

main().catch(console.error);

