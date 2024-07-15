import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { jwtDecode } from "jwt-decode"; // Make sure to import jwtDecode correctly
import trxAbi from "../../../artifacts/contracts/Transaction.sol/TransactionContract.json";
import TierCard from "../../components/tier-card/tiercard";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { getCookie } from "../../utils/cookie";

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Setiap kali ada perubahan lokasi, scroll ke atas
  }, [location]);
  const creatorId = useParams();
  const trxAddress = "0x5d685F32DbF0d03f43474f5Fc77205DA0F63A2D1";

  const [tierData, setTierData] = useState([]);
  const [creatorProfile, setCreatorProfile] = useState({});
  const [creatorWallet, setCreatorWallet] = useState();

  useEffect(() => {
    const fetchTierData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/account-tier/${creatorId.id}`
        );
        setTierData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching tier data:", error);
      }
    };

    const fetchCreatorWallet = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/account/creator-wallet/${creatorId.id}`
        );
        setCreatorWallet(response.data);
        console.log(creatorWallet);
      } catch (error) {
        console.error("Error fetching creator profile:", error);
      }
    };

    const fetchCreatorProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/search/${creatorId.id}`
        );
        setCreatorProfile(response.data);
        console.log(creatorId);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching creator profile:", error);
      }
    };
    fetchTierData();
    fetchCreatorWallet();
    fetchCreatorProfile();
  }, [creatorId]);

  const handleTransaction = async (amount, receiver, tier) => {
    // Check if amount, receiver, and tier are valid
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Jumlah tidak valid");
      return;
    }

    if (!receiver || typeof receiver !== "string") {
      alert("Alamat penerima tidak valid");
      return;
    }

    if (!tier || isNaN(tier) || tier <= 0) {
      alert("Tingkat tidak valid");
      return;
    }

    // Check if window.ethereum is available
    if (!window.ethereum) {
      alert("MetaMask tidak terpasang");
      return;
    }

    // Check if user is logged in and access token is available
    const token = getCookie('accessToken');
    if (!token) {
      alert("Pengguna tidak masuk log");
      return;
    }

    // Decode userId from the access token
    let userId;
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId; // Sesuaikan ini sesuai dengan struktur token Anda
      if (!userId) {
        throw new Error("Token tidak valid: userId tidak ditemukan");
      }
    } catch (error) {
      alert("Gagal mendekode token");
      console.error("Kesalahan dekode token:", error);
      return;
    }

    const formattedAmount = amount.toString();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const contract = new ethers.Contract(trxAddress, trxAbi.abi, signer);
    const transactionAmount = ethers.utils.parseEther(formattedAmount);

    try {
      const balance = await provider.getBalance(signerAddress);
      const balanceInEther = ethers.utils.formatEther(balance);

      if (parseFloat(balanceInEther) < parseFloat(amount)) {
        alert("Saldo tidak mencukupi untuk melakukan transaksi");
        return;
      }

      const tx = await contract.addTransactionAndSendEther(
        receiver,
        tier,
        transactionAmount,
        {
          value: transactionAmount,
        }
      );
      alert("Pembayaran Anda sedang diproses");
      await tx.wait();
      console.log("Pembayaran berhasil");
      alert("Pembayaran Anda berhasil");

      const startAt = new Date().toISOString();
      const oneMonthLater = new Date();
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
      const expiresAt = oneMonthLater.toISOString();

      const payload = {
        buyer_id: userId, // Gunakan userId yang didekode sebagai buyer_id
        artist_id: 2, // Ini seharusnya dinamis atau diambil berdasarkan konteks
        tier_id: tier,
        start_at: startAt,
        expires_at: expiresAt,
      };

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/subs/",
          payload,
          config
        );
        console.log("Respon server:", response.data);
      } catch (error) {
        console.error("Kesalahan:", error);
      }
      alert("Data transaksi berhasil disimpan");
    } catch (error) {
      console.log("handleTransaction", error);
      alert("Pembayaran dibatalkan");
    }
  };

  const getIncomingTransaction = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const loggedInUser = localStorage.getItem("address");
    const address = loggedInUser ? JSON.parse(loggedInUser) : "";
    const signerAddress = await signer.getAddress();
    const contract = new ethers.Contract(trxAddress, trxAbi.abi, signer);
    try {
      if (signerAddress === address) {
        const incomingTrx = await contract.getIncomingTransactionHistory(
          address
        );
        setAllIncomingTrx(incomingTrx);
      }
    } catch (error) {
      console.log("get incoming transaction", error);
      alert("Terjadi kesalahan");
    }
  };

  const getOutgoingTransaction = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const loggedInUser = localStorage.getItem("address");
    const address = loggedInUser ? JSON.parse(loggedInUser) : "";
    const signerAddress = await signer.getAddress();
    const contract = new ethers.Contract(trxAddress, trxAbi.abi, signer);
    try {
      if (signerAddress === address) {
        const outgoingTrx = await contract.getOutgoingTransactionHistory(
          address
        );
        setAllOutgoingTrx(outgoingTrx);
      }
    } catch (error) {
      console.log("get outgoing transaction", error);
      alert("Terjadi kesalahan");
    }
  };

  return (
    <div className="container mx-auto pt-8 px-8">
      {creatorProfile && (
        <div
          className="relative bg-no-repeat bg-cover rounded-2xl text-white md:p-10 lg:p-16"
          style={{ backgroundImage: `url(${creatorProfile.cover})` }}
        >
          <div className="absolute inset-0 bg-black opacity-30 rounded-[20px]"></div>
          <div className="relative flex flex-col md:flex-row md:items-center gap-4">
            <div className="col-span-1 flex justify-center md:justify-start">
              {creatorProfile.profile_picture ? (
                <img
                  src={creatorProfile.profile_picture}
                  alt="Avatar"
                  className="w-36 h-36 md:w-48 md:h-48 rounded-full"
                />
              ) : (
                <RiAccountCircleFill className="w-36 h-36 md:w-48 md:h-48 rounded-full text-white" />
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                {creatorProfile.name}
              </h1>
              <p className="text-lg md:text-xl">{creatorProfile.description}</p>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {tierData.map((data, idx) => (
          <TierCard
            key={idx}
            image={data.tier.card}
            tier_name={data.tier.tier_name}
            description={data.tier.description}
            price={data.tier.price}
            onClick={() =>
              handleTransaction(
                data.tier.price,
                creatorWallet.wallet,
                data.tier.id
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
