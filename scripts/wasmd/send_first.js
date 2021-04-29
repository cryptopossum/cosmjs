#!/usr/bin/env yarn node

/* eslint-disable @typescript-eslint/naming-convention */
const { coins } = require("@cosmjs/amino");
const { Random } = require("@cosmjs/crypto");
const { Bech32 } = require("@cosmjs/encoding");
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { assertIsBroadcastTxSuccess, SigningStargateClient } = require("@cosmjs/stargate");

const rpcUrl = "http://localhost:26659";
const prefix = "wasm";
const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  address0: "wasm1pkptre7fdkl6gfrzlesjjvhxhlc3r4gm32kke3",
};

async function main() {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic, { prefix: prefix });
  const client = await SigningStargateClient.connectWithSigner(rpcUrl, wallet, { prefix: prefix });
  const recipient = Bech32.encode(prefix, Random.getBytes(20));
  const amount = coins(226644, "ucosm");
  const memo = "Ensure chain has my pubkey";
  const sendResult = await client.sendTokens(faucet.address0, recipient, amount, memo);
  assertIsBroadcastTxSuccess(sendResult);
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
