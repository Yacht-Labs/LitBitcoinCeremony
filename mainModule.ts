import { YachtLitSdk } from "lit-swap-sdk";
import { readMumbaiPrivateKeyEnv, readMumbaiRpcUrlEnv } from "./env";
import { ethers } from "ethers";

export async function generatePKP() {
  const sdk = new YachtLitSdk({
    signer: new ethers.Wallet(
      readMumbaiPrivateKeyEnv(),
      new ethers.providers.JsonRpcProvider(readMumbaiRpcUrlEnv())
    ),
    btcTestNet: false,
  });

  const { publicKey } = await sdk.mintPkp();
  console.log("publicKey", publicKey);
  const btcAddress = sdk.generateBtcAddress(publicKey);
  console.log("btcAddress", btcAddress);
}

export async function sendBTCFromPKP() {
  const pkpPublicKey =
    "0x041d9e62cd7c7a2d82fd7463c0ac244fecb399f873c019c3512052851a18584c6e87c9ad964f2386477ca8191dc3fff9a2b9e13fdcbe026349f7671835a3034a3f";
  const recipientAddress =
    "bc1pj3386kczn59yahvwvkwf9r9f20zw6zg2ulgm7dhpn4eycdppnyuqv47c77";

  const sdk = new YachtLitSdk({
    signer: new ethers.Wallet(
      readMumbaiPrivateKeyEnv(),
      new ethers.providers.JsonRpcProvider(readMumbaiRpcUrlEnv())
    ),
    btcTestNet: false,
  });

  const signedTransaction = await sdk.signFirstBtcUtxo({
    pkpPublicKey,
    fee: 20,
    recipientAddress,
  });
  console.log("signedTransaction", signedTransaction);
  const txId = await sdk.broadcastBtcTransaction(signedTransaction);
  console.log("txId", txId);
}
