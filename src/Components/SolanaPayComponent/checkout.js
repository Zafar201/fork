import {
  //   createQR,
  createQROptions,
  encodeURL,
  findReference,
  //   FindReferenceError,
  //   parseURL,
} from "@solana/pay";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import BigNumber from "bignumber.js";
import QRCodeStyling from "@solana/qr-code-styling";
import { useEffect, useRef, useMemo, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

// import { capitalizeFirstLetter } from "../../Action";

export default function Checkout({ paymentSuccessView, paymentFaildView }) {
  const recipient = new PublicKey(
    "1aY7BjKxva4YWGxGh1NvnL1HvryKLzB14N1haU3w9nW"
  );
  const amount = 0.0001;
  const { connection: conn } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  //   const [value, setValue] = useState(1);
  const [status, setStatus] = useState(0);
  const [signature, setSignature] = useState();
  const [isWaiting, setIsWaiting] = useState(false);
  const [walletApproveError, setWalletApproveError] = useState("");
  const [reference, setReference] = useState(Keypair.generate().publicKey);

  const [url, setUrl] = useState();
  const options = useMemo(
    () => createQROptions(url, 300, "transparent", "#2a2a2a"),
    [url]
  );
  const qr = useMemo(() => new QRCodeStyling(), []);
  const qrRef = useRef();

  useEffect(() => {
    const urlParams = {
      recipient: recipient,
      amount: BigNumber(amount),
      label: "Jackpot",
      message: "Thanks for your order! 😁",
      reference: reference,
    };
    setUrl(encodeURL(urlParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  useEffect(() => {
    qr.update(options);
  }, [qr, options]);

  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }
  }, [qrRef, qr]);

  useEffect(() => {
    if (!(status === 0 && reference && !signature)) return;
    let changed = false;
    const interval = setInterval(async () => {
      try {
        const signatureInfo = await findReference(conn, reference);
        if (!changed) {
          console.log(changed);
          clearInterval(interval);
          setSignature(signatureInfo.signature);
          setStatus(1);
        }
      } catch (e) {
        // if(e instanceof FindReferenceError){
        //     console.log('pending')
        //     return
        // }
        // console.error('Unknown Error', e)
      }
    }, 500);
    return () => {
      changed = true;
      clearInterval(interval);
    };
  }, [status, signature, reference, conn]);

  const sendPayment = async () => {
    try {
      let transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipient,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );
      await sendTransaction(transaction, conn);
      setStatus(1);
    } catch (err) {
      console.log("err", err.message);
      setWalletApproveError(err.message);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {status === 0 ? (
        <>
          <p style={{ color: "#0000ff" }}>
            You need to pay <span style={{ color: "#ff0000" }}>{amount}</span>{" "}
            Sol to Recipient
          </p>
          <div ref={qrRef} style={{ textAlign: "center" }} />
          {publicKey && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <button
                disabled={isWaiting}
                className="wallet-adapter-button wallet-payment-button"
                onClick={async () => {
                  setWalletApproveError("");
                  setIsWaiting(true);
                  await sendPayment();
                  setIsWaiting(false);
                }}
              >
                {isWaiting ? "Sending..." : "Pay with Wallet"}
              </button>
            </div>
          )}
          <div
            style={{ display: "flex", justifyContent: "center" }}
            onClick={() => setWalletApproveError("")}
          >
            <WalletMultiButton />
          </div>
          <br />
          {walletApproveError && { paymentFaildView }}
        </>
      ) : (
        <>{paymentSuccessView}</>
      )}
    </div>
  );
}

