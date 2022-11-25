import { MerkleTreeOptions, MerkleTree, buildHashFunction, SHA_256 } from "../src/merkletree"
const { ApiPromise } = require('@polkadot/api');
import { createScClient, WellKnownChain } from '@substrate/connect';

const options1 = {
    doubleHash: true,
    engine: 'sha-256',
    sort: true
  } as MerkleTreeOptions

  const sha256 = buildHashFunction(SHA_256)
  const tree1 = new MerkleTree(options1)


  const main = async() => {
    const provider = new ScProvider(WellKnownChain.polkadot);
await provider.connect();
const polkadotApi = await ApiPromise.create({ provider });
await polkadotApi.rpc.chain.subscribeNewHeads((lastHeader) => {
  console.log("run");
});

   
      // const wsProvider = new WsProvider('wss://rpc.polkadot.io');
//   const provider = new ScProvider(WellKnownChain.polkadot);
//   await provider.connect()

//   const api = await ApiPromise.create({ provider });

//   let count = 0;
//   const unsubscribe = await api.rpc.chain.subscribeNewHeads(async (header: { hash: any; }) => {
//     console.log(`Chain is at block: #${header.hash}`);
//     await tree1.addLeaves(true, Buffer.from(header.hash))

//     const rootHash = tree1.getRootHash()
//     console.log(rootHash)
//     console.log(tree1.depth())

//     if (++count === 256) {
//       unsubscribe();
//       process.exit(0);
//     }
//   });

  

  }
  

  main();
  