"use client"
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {toast} from "react-hot-toast";

const Header = () => {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.listAccounts().then((accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      toast.success("Wallet Connected!");
      return;
    } else {
      toast.warn("Please install MetaMask Wallet!");
      return;
    }
  };

  return (
    <header className="flex justify-between w-full gap-10 items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <img
          src="/header.png"
          alt="Company Logo"
          className="h-10"
        />
        
      </div>
      <button
        onClick={connectWallet}
        className="p-3 bg-blue-600 font-bold rounded-md"
      >
        {walletAddress
          ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(
              -4
            )}`
          : "Connect Wallet"}
      </button>
    </header>
  );
};

export default Header;
