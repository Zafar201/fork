import {
  clusterApiUrl,
  Connection,
  PublicKey,
  // RpcResponseAndContext,
  // SignatureResult,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  // FC,
  useEffect,
  useRef,
  useState,
} from "react";
// import { PhantomProvider } from "./ConnectWallet";

// interface ITransferSolProps {
//   provider: PhantomProvider;
// }

const network = "devnet";

const defaultDest = "A3gWSs3vB6T1hwbEP5ENJgnydBJzH3TL1QjPWASYkDbK";

const TransferSol = ({
  provider,
  // setProvider,
  connected,
}) => {
  const [destAddr, setDestAddr] = useState(defaultDest);
  const [lamports, setLamports] = useState(10000);
  // const [txid, setTxid] = useState(null);
  // const [slot, setSlot] = useState(null);
  // const [myBalance, setMyBalance] = useState(0);
  // const [rxBalance, setRxBalance] = useState(0);
  // Create a connection to blockchain and
  // make it persistent across renders
  const connection = useRef(new Connection(clusterApiUrl(network)));

  // Get the balance the first time the component is mounted
  useEffect(() => {
    connection.current
      .getBalance(provider.publicKey)
      .then
      // setMyBalance
      ();
  }, [provider.publicKey]);

  useEffect(() => {
    connection.current
      .getBalance(new PublicKey(destAddr))
      .then
      // setRxBalance
      ();
  }, [destAddr]);

  // const handleChangeAddr = (event) => {
  //   setDestAddr(event.target.value);
  // };

  // const handleChangeLamp = (event) => {
  //   setLamports(parseInt(event.target.value));
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a TX object
    let transaction = new Transaction({
      feePayer: provider.publicKey,
      recentBlockhash: (await connection.current.getRecentBlockhash())
        .blockhash,
    });

    // Add instructions to the tx
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: new PublicKey(destAddr),
        lamports: lamports,
      })
    );

    // Get the TX signed by the wallet (signature stored in-situ)
    await provider.signTransaction(transaction);

    // Send the TX to the network
    connection.current
      .sendRawTransaction(transaction.serialize())
      .then((id) => {
        // setTxid(id);
        connection.current.confirmTransaction(id).then((confirmation) => {
          // setSlot(confirmation.context.slot);
          connection.current
            .getBalance(provider.publicKey)
            .then
            // setMyBalance
            ();
          connection.current
            .getBalance(new PublicKey(destAddr))
            .then
            // setRxBalance
            ();
        });
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <label>Enter address of destination</label> */}
      <br />
      <p>{destAddr}</p>
      {/* <input type="text" value={destAddr} onChange={handleChangeAddr} /> */}
      <br />
      {/* <label>Amount of lamports</label> */}
      <br />
      <p>{lamports}</p>
      {/* <input type="number" value={lamports} onChange={handleChangeLamp} /> */}
      <br />
      {connected && <input type="submit" value="Send lamports" />}
      {/* <hr />
      <p>My Balance: {myBalance} lamports</p>
      <p>Recipient Balance: {rxBalance} lamports</p>
      <hr />
      {txid ? (
        <p>
          Transaction id: <span style={{ fontSize: "0.7em" }}>{txid}</span>
        </p>
      ) : null}
      {slot ? <p>Confirmation slot: {slot}</p> : null} */}
    </form>
  );
};

export default TransferSol;
