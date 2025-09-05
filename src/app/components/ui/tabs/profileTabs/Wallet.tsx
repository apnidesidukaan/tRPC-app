"use client";

import React, { useState, useEffect } from "react";
import {
  Wallet,
  Plus,
  Minus,
  Eye,
  EyeOff,
  RefreshCw,
  Clock,
  Lock,
} from "lucide-react";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";

const MyWallet = () => {
  const { id } = useParams(); // Vendor/User ID
  const getWallet = api.wallet.get.useMutation();

  const [walletData, setWalletData] = useState<any>(null);
  const [showBalance, setShowBalance] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("add");

  // 🔹 Fetch wallet on mount
  useEffect(() => {
    const fetchWallet = async () => {
      if (!id) return;
      try {
        const wallet = await getWallet.mutateAsync({
          userId: String(id),
          userModel: "vendor",
        });
        setWalletData(wallet);
      } catch (err) {
        console.error("❌ Error fetching wallet:", err);
      }
    };

    fetchWallet();
  }, [id]);

  const availableBalance =
    (walletData?.balance || 0) - (walletData?.lockedAmount || 0);

  const handleRefresh = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const wallet = await getWallet.mutateAsync({
        userId: String(id),
        userModel: "vendor",
      });
      setWalletData(wallet);
    } catch (err) {
      console.error("❌ Refresh failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransaction = () => {
    const transactionAmount = parseFloat(amount);
    if (!transactionAmount || transactionAmount <= 0) return;

    setWalletData((prev: any) => ({
      ...prev,
      balance:
        transactionType === "add"
          ? prev.balance + transactionAmount
          : Math.max(0, prev.balance - transactionAmount),
      updatedAt: new Date().toISOString(),
    }));
    setAmount("");
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount || 0);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const getUserModelColor = (model: string) => {
    const colors: Record<string, string> = {
      customer: "bg-blue-100 text-blue-800",
      vendor: "bg-green-100 text-green-800",
      deliveryAgent: "bg-orange-100 text-orange-800",
      areaManager: "bg-purple-100 text-purple-800",
    };
    return colors[model] || "bg-gray-100 text-gray-800";
  };

  if (!walletData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading wallet...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Wallet className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">My Wallet</h1>
                <p className="text-blue-100">Manage your finances</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getUserModelColor(
                  walletData?.userModel
                )}`}
              >
                {walletData?.userModel}
              </span>
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
              >
                <RefreshCw
                  className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Balance Overview */}
        <div className="p-6 border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-green-800">
                  Total Balance
                </h3>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-green-600 hover:text-green-800"
                >
                  {showBalance ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-2xl font-bold text-green-700">
                {showBalance
                  ? formatCurrency(walletData?.balance)
                  : "••••••"}
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center space-x-2 mb-2">
                <Lock className="h-4 w-4 text-orange-600" />
                <h3 className="text-sm font-medium text-orange-800">
                  Locked Amount
                </h3>
              </div>
              <p className="text-2xl font-bold text-orange-700">
                {showBalance
                  ? formatCurrency(walletData?.lockedAmount)
                  : "••••••"}
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Wallet className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-medium text-blue-800">
                  Available Balance
                </h3>
              </div>
              <p className="text-2xl font-bold text-blue-700">
                {showBalance
                  ? formatCurrency(availableBalance)
                  : "••••••"}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {['overview', 'transactions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Wallet Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">User ID:</span>
                      {/* <span className="font-mono text-sm">{walletData?.userId.slice(-8)}...</span> */}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">User Type:</span>
                      {/* <span className="font-medium">{walletData?.userModel}</span> */}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      {/* <span className="text-sm">{formatDate(walletData?.createdAt)}</span> */}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Last Updated:</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{formatDate(walletData?.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <select
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="add">Add Money</option>
                        <option value="withdraw">Withdraw</option>
                      </select>
                      <div className="flex items-center bg-white border border-gray-300 rounded-lg">
                        <span className="px-3 py-2 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          className="px-2 py-2 border-none focus:ring-0 rounded-r-lg"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleTransaction}
                      disabled={!amount || parseFloat(amount) <= 0}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      {transactionType === 'add' ? <Plus className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                      <span>{transactionType === 'add' ? 'Add Money' : 'Withdraw'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <div className="bg-gray-50 p-8 rounded-xl text-center">
                <div className="text-gray-400 mb-2">
                  <Wallet className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-600">No transactions found</p>
                <p className="text-sm text-gray-500 mt-1">Your transaction history will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyWallet;
