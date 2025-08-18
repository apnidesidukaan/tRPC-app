"use client";

import { useState } from "react";
import { api } from "~/trpc/react"; // adjust if needed
import TrendingProductsSection from "../components/sections/TrendingProductsSection";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import MobileMenu from "../layouts/MobileMenu";

export default function UserRegistration() {
  const registerMutation = api.user.register.useMutation();
  const { data } = api.role.getByName.useQuery('user');
  // console.log('data', data);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    gender: "male",
    dob: "",
    agreementCheck: false,
    referralCode: "",
    roleId: data?.id,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerMutation.mutateAsync(form);
      alert("User registered successfully!");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />
      <MobileMenu />

      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
        <h2 className="text-2xl font-semibold mb-6">User Registration</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="mobile"
            type="text"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="referralCode"
            type="text"
            placeholder="Referral Code (optional)"
            value={form.referralCode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="roleId"
            type="text"
            placeholder="Role ID"
            value={form.roleId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <div className="flex items-center gap-2">
            <input
              name="agreementCheck"
              type="checkbox"
              checked={form.agreementCheck}
              onChange={handleChange}
              required
            />
            <label>I agree to the terms & conditions</label>
          </div>

          <button
            type="submit"
            disabled={registerMutation.isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {registerMutation.isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
