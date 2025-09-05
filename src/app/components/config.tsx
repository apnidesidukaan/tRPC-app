
'use client'
import { useState } from "react";
import { api } from "~/trpc/react";

export default function DeliveryRulesAdmin() {
  const { data: rules, refetch } = api.delivery.getAllRules.useQuery();
  const createRule = api.delivery.createRule.useMutation({ onSuccess: refetch });
  const updateRule = api.delivery.updateRule.useMutation({ onSuccess: refetch });
  const deleteRule = api.delivery.deleteRule.useMutation({ onSuccess: refetch });

  const [form, setForm] = useState({
    minDistance: 0,
    maxDistance: 0,
    baseCharge: 0,
    expressCharge: 0,
    freeAbove: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createRule.mutate(form);
    setForm({ minDistance: 0, maxDistance: 0, baseCharge: 0, expressCharge: 0, freeAbove: 0 });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Delivery Rules Management</h1>

      {/* Add Rule Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-4 bg-gray-50 p-4 rounded-xl shadow">
        {["minDistance","maxDistance","baseCharge","expressCharge","freeAbove"].map((field) => (
          <input
            key={field}
            type="number"
            placeholder={field}
            value={(form as any)[field]}
            onChange={(e) => setForm({ ...form, [field]: Number(e.target.value) })}
            className="border p-2 rounded col-span-1"
          />
        ))}
        <button type="submit" className="col-span-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Rule
        </button>
      </form>

      {/* Rules Table */}
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border px-3 py-2">Distance</th>
            <th className="border px-3 py-2">Base Charge</th>
            <th className="border px-3 py-2">Express Charge</th>
            <th className="border px-3 py-2">Free Above</th>
            <th className="border px-3 py-2">Profit Est.</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules?.map((r) => {
            const actualCost = r.minDistance * 5; // 👈 example: cost/km = ₹5
            const profit = r.baseCharge - actualCost;
            return (
              <tr key={r.id}>
                <td className="border px-3 py-2">{r.minDistance}–{r.maxDistance} km</td>
                <td className="border px-3 py-2">₹{r.baseCharge}</td>
                <td className="border px-3 py-2">₹{r.expressCharge}</td>
                <td className="border px-3 py-2">₹{r.freeAbove}</td>
                <td className={`border px-3 py-2 font-semibold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ₹{profit}
                </td>
                <td className="border px-3 py-2 space-x-2">
                  <button
                    onClick={() => deleteRule.mutate(r.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  {/* Quick update example: increase baseCharge by 5 */}
                  <button
                    onClick={() => updateRule.mutate({ id: r.id, baseCharge: r.baseCharge + 5 })}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    +₹5
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
