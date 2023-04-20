import {
  // FC,
  useEffect,
  // useState,
} from "react";
// import {
//    Connection,
//   PublicKey,
//   clusterApiUrl
// } from "@solana/web3.js";

// type PhantomEvent = "disconnect" | "connect" | "accountChanged";

// interface ConnectOpts {
//     onlyIfTrusted: boolean;
// }

// interface PhantomProvider {
//     connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
//     disconnect: ()=>Promise<void>;
//     on: (event: PhantomEvent, callback: (args:any)=>void) => void;
//     isPhantom: boolean;
// }

// type WindowWithSolana = Window & {
//     solana?: PhantomProvider;
// }

const Connect2Phantom = ({
  provider,
  setProvider,
  walletAvail,
  setWalletAvail,
  connected,
  setConnected,
}) => {
  // const [pubKey, setPubKey] = useState(
  //   new PublicKey("5bCeKptLFzDMAjbDcE3YRpirvQkMUjZCR2nMDyvjRdPR")
  // );

  useEffect(() => {
    if ("solana" in window) {
      const solWindow = window;
      // as WindowWithSolana;
      if (solWindow?.solana?.isPhantom) {
        setProvider(solWindow.solana);
        setWalletAvail(true);
        // Attemp an eager connection
        solWindow.solana.connect({ onlyIfTrusted: true });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    provider?.on(
      "connect",
      (
        publicKey
        // : PublicKey
      ) => {
        setConnected(true);
        // setPubKey(publicKey);
      }
    );
    provider?.on("disconnect", () => {
      setConnected(false);
      // setPubKey(null);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  const connectHandler = (event) => {
    provider?.connect().catch((err) => {
      console.error("connect ERROR:", err);
    });
  };

  const disconnectHandler = (event) => {
    provider?.disconnect().catch((err) => {
      console.error("disconnect ERROR:", err);
    });
  };

  return (
    <div>
      {walletAvail ? (
        <>
          {!connected ? (
            <button disabled={connected} onClick={connectHandler}>
              Connect to Phantom
            </button>
          ) : (
            <button disabled={!connected} onClick={disconnectHandler}>
              Disconnect from Phantom
            </button>
          )}
          {/* {connected ? <p>Your public key is : {pubKey?.toBase58()}</p> : null} */}
        </>
      ) : (
        <>
          <p>
            Opps!!! Phantom is not available. Go get it{" "}
            <a href="https://phantom.app/">https://phantom.app/</a>.
          </p>
        </>
      )}
    </div>
  );
};

export default Connect2Phantom;
