import {
  useMemo,
  // useState,
  // useEffect
} from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import "./style.css";
// import { clusterApiUrl } from "@solana/web3.js";
import Checkout from "./checkout";

export default function SolanaPayComponent({
  paymentSuccessView,
  paymentFaildView,
}) {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint =
    "https://damp-patient-pond.solana-mainnet.quiknode.pro/83ac085a56368f1e6f448af00cd55c18579bb2b6/";

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new GlowWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Checkout
            paymentSuccessView={paymentSuccessView}
            paymentFaildView={paymentFaildView}
          />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
