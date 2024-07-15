import React from "react";
import Web3 from "web3";

export default function LoginWithMetamask() {
  const loginWithMetamask = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        // Mengambil alamat akun yang terhubung dengan Metamask
        const accounts = await web3.eth.getAccounts();
        const selectedAccount = accounts[0];
        alert(`Logged in with account: ${selectedAccount}`);
        // Lakukan sesuatu setelah login berhasil, misalnya, navigasi ke halaman beranda
      } catch (error) {
        console.error("User denied account access or other error occurred:", error);
        // Handle error, misalnya, tampilkan pesan kepada pengguna
      }
    } else {
      alert("Metamask extension is not installed, please install it to login with Metamask.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login with Metamask</h1>
      <button onClick={loginWithMetamask} className="bg-blue-500 text-white px-4 py-2 rounded-md">Login with Metamask</button>
    </div>
  );
}
