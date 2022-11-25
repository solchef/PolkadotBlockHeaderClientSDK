# `polkadot-header-listener`

> TODO: 
Building a Polkadot block header light client. The program should
listen to new Polkadot headers, and store sequential batches of them inside a Merkle tree. The
stored data should be accessible in some form of your choosing and fulfill the following
attributes.

Attributes:
- Decide on a header batch size and create and write to Merkle tree once the size limit
has been reached
- Store the Merkle trees and corresponding roots in a way you see fit (in-memory is
sufficient)
- Each header should be queryable by block number or hash
- Implement a function that generates the Merkle inclusion proof for each stored header
- Implement a function for verifying the generated proofs

## Usage

```
// TODO: DEMONSTRATE USAGE
```
