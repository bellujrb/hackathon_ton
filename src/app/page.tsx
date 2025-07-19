"use client";

import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import React from "react";

function HomeContent() {
  const wallet = useTonWallet();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-foreground/5 relative">
      <div className="text-center">
        <h1 className="mb-8 font-mono text-4xl font-bold tracking-tight text-foreground/80 sm:text-6xl md:text-7xl">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            TON Wallet
          </span>
          <br />
          <span>Authentication</span>
        </h1>
        
        {wallet ? (
          <div className="mb-8">
            <p className="text-lg text-foreground/80 mb-4">
              ✅ Wallet conectada!
            </p>
            <p className="text-sm text-foreground/60">
              Endereço: {wallet.account.address.slice(0, 10)}...{wallet.account.address.slice(-10)}
            </p>
          </div>
        ) : (
          <p className="text-lg text-foreground/80 mb-8">
            Conecte sua carteira TON para continuar
          </p>
        )}
      </div>
      
      <div className="fixed right-6 bottom-6">
        <TonConnectButton />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <TonConnectUIProvider manifestUrl="https://yellow-accused-earwig-831.mypinata.cloud/ipfs/bafkreia7xookhxwowo5pizgjoaj3rc4tziijgu3sf62gfgule24qo47hvy">
      <HomeContent />
    </TonConnectUIProvider>
  );
}
