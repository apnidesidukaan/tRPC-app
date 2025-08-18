'use client'
import React, { useState } from "react";

export default function InventoryPage() {
  const product = {
    id: "prod1",
    name: "Maggi",
    brand: "Nestlé",
    description: "Maggi Instant Noodles loved worldwide.",
    category: "Food & Beverages",
  };  

  const [inventory, setInventory] = useState([
    { id: "inv1", productId: "prod1", variant: "70g Pack", price: 45, stock: 25, sku: "MAG-70" },
    { id: "inv2", productId: "prod1", variant: "120g x2", price: 78, stock: 4, sku: "MAG-120-2" },
  ]);

  const [formData, setFormData] = useState({
    variant: "",
    price: "",
    stock: "",
    sku: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!formData.variant || !formData.price || !formData.stock) return;
    const newItem = {
      id: Date.now().toString(),
      productId: product.id,
      variant: formData.variant,
      price: Number(formData.price),
      stock: Number(formData.stock),
      sku: formData.sku,
    };
    setInventory([...inventory, newItem]);
    setFormData({ variant: "", price: "", stock: "", sku: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Product Info */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-sm text-gray-500">Brand: {product.brand}</p>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="mt-1 text-xs text-gray-400">Category: {product.category}</p>
      </div>

      {/* Add Inventory Form */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Inventory</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="variant"
            placeholder="Variant (e.g., 70g Pack)"
            value={formData.variant}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="text"
            name="sku"
            placeholder="SKU (optional)"
            value={formData.sku}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Inventory
        </button>
      </div>

      {/* Inventory List */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm text-left">
              <th className="p-2 border-b">Variant</th>
              <th className="p-2 border-b">Price</th>
              <th className="p-2 border-b">Stock</th>
              <th className="p-2 border-b">SKU</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="text-sm hover:bg-gray-50">
                <td className="p-2 border-b">{item.variant}</td>
                <td className="p-2 border-b">₹{item.price}</td>
                <td className="p-2 border-b">{item.stock}</td>
                <td className="p-2 border-b">{item.sku || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
