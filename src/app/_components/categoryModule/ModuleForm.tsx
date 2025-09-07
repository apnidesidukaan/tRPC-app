"use client";
import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";

type ModuleFormProps = {
    initialData?: any;
    onSuccess: () => void;
};

export const ModuleForm: React.FC<ModuleFormProps> = ({ initialData, onSuccess }) => {
    const isEdit = Boolean(initialData?.id);

    const createMutation = api.module.create.useMutation({ onSuccess });
    const updateMutation = api.module.update.useMutation({ onSuccess });

    const { data: businesses, isLoading: loadingBusinesses } = api.business.getAll.useQuery();

    const [form, setForm] = useState({
        name: "",
        description: "",
        businessId: "",
        icon: "",
        isActive: true,
        isFeatured: true,
        version: "1.0",
        metadata: "",
        createdBy: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || "",
                description: initialData.description || "",
                businessId: initialData.businessId || "",
                icon: initialData.icon || "",
                isActive: initialData.isActive ?? true,
                isFeatured: initialData.isFeatured ?? true,
                version: initialData.version || "1.0",
                metadata: JSON.stringify(initialData.metadata || {}),
                createdBy: initialData.createdBy || "",
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? 0 : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { ...form, metadata: JSON.parse(form.metadata || "{}") };
        if (isEdit) updateMutation.mutate({ id: initialData.id, ...payload });
        else createMutation.mutate(payload);

        if (!isEdit) {
            setForm(prev => ({ ...prev, name: "", description: "", businessId: "", icon: "", metadata: "", createdBy: "" }));
        }
        
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-5">
            <h2 className="text-2xl font-semibold text-gray-700">{isEdit ? "Edit Module" : "Create Module"}</h2>

            <div className="space-y-3">
                <label className="block text-gray-600 font-medium">Module Name</label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Module Name"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                />
            </div>

            <div className="space-y-3">
                <label className="block text-gray-600 font-medium">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            <div className="space-y-3">
                <label className="block text-gray-600 font-medium">Select Business</label>
                <select
                    name="businessId"
                    value={form.businessId}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                    disabled={loadingBusinesses}
                >
                    <option value="">Select Business</option>
                    {businesses?.map((b: any) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                    <label className="block text-gray-600 font-medium">Icon URL</label>
                    <input
                        name="icon"
                        value={form.icon}
                        onChange={handleChange}
                        placeholder="Icon URL"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>
                <div className="space-y-3">
                    <label className="block text-gray-600 font-medium">Version</label>
                    <input
                        name="version"
                        value={form.version}
                        onChange={handleChange}
                        placeholder="Version"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <label className="block text-gray-600 font-medium">Metadata (JSON)</label>
                <textarea
                    name="metadata"
                    value={form.metadata}
                    onChange={handleChange}
                    placeholder="Metadata (JSON)"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            <div className="flex gap-6 items-center">
                <label className="flex items-center gap-2 text-gray-600">
                    <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} className="w-5 h-5 accent-indigo-500" /> Active
                </label>
                <label className="flex items-center gap-2 text-gray-600">
                    <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} className="w-5 h-5 accent-indigo-500" /> Featured
                </label>
            </div>

            <div className="space-y-3">
                <label className="block text-gray-600 font-medium">Created By</label>
                <input
                    name="createdBy"
                    value={form.createdBy}
                    onChange={handleChange}
                    placeholder="Created By"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                {isEdit ? "Update Module" : "Create Module"}
            </button>
        </form>
    );
};
