import { QueryClient, setupAuthExtension } from "@cosmjs/stargate";
import { Any } from "@cosmjs/stargate/build/codec/google/protobuf/any";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";

// https://github.com/ovrclk/net/blob/24ddbb427/mainnet/rpc-nodes.txt
const tmClient = await Tendermint34Client.connect("http://rpc.akash.forbole.com:80");
const client = QueryClient.withExtensions(tmClient, setupAuthExtension);

// Arbitrary entry from https://raw.githubusercontent.com/ovrclk/net/24ddbb427/mainnet/genesis.json
const account = await client.auth.unverified.account("akash1qy0vur3fl2ucztpzcrfea7mc8jwz8xjmvq7qvy");
console.log(Any.toJSON(account))
