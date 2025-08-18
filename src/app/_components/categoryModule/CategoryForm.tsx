"use client";
import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";

type CategoryFormProps = {
  initialData?: any;
  onSuccess: () => void;
};

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  onSuccess,
}) => {
  const isEdit = Boolean(initialData?.id);

  const createMutation = api.category.create.useMutation({ onSuccess });
  const updateMutation = api.category.update.useMutation({ onSuccess });

  // Get all modules to associate a category
  const { data: modules, isLoading: loadingModules } =
    api.module.getAll.useQuery();

  const [form, setForm] = useState({
    name: "",
    description: "",
    icon: "",
    isDeleted: false,
    isPromoted: false,
    createdBy: "",
    updatedBy: "",
    moduleId: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        description: initialData.description || "",
        icon: initialData.icon || "",
        isDeleted: initialData.isDeleted ?? false,
        isPromoted: initialData.isPromoted ?? false,
        createdBy: initialData.createdBy || "",
        updatedBy: initialData.updatedBy || "",
        moduleId: initialData.moduleId || "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) updateMutation.mutate({ id: initialData.id, ...form });
    else createMutation.mutate(form);

    if (!isEdit) {
      setForm({
        name: "",
        description: "",
        icon: "",
        isDeleted: false,
        isPromoted: false,
        createdBy: "",
        updatedBy: "",
        moduleId: "",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-5"
    >
      <h2 className="text-2xl font-semibold text-gray-700">
        {isEdit ? "Edit Category" : "Create Category"}
      </h2>

      {/* Name */}
      <div className="space-y-1">
        <label className="block text-gray-600 font-medium">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Category Name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="block text-gray-600 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
      </div>

      {/* Module Select */}
      <div className="space-y-1">
        <label className="block text-gray-600 font-medium">
          Assign to Module
        </label>
        <select
          name="moduleId"
          value={form.moduleId}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
          disabled={loadingModules}
        >
          <option value="">Select Module</option>
          {modules?.map((m: any) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* Icon */}
      <div className="space-y-1">
        <label className="block text-gray-600 font-medium">Icon URL</label>
        <input
          name="icon"
          value={form.icon}
          onChange={handleChange}
          placeholder="Icon URL"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {/* Checkboxes */}
      <div className="flex gap-6 items-center">
        <label className="flex items-center gap-2 text-gray-600">
          <input
            type="checkbox"
            name="isDeleted"
            checked={form.isDeleted}
            onChange={handleChange}
            className="w-5 h-5 accent-indigo-500"
          />{" "}
          Deleted
        </label>
        <label className="flex items-center gap-2 text-gray-600">
          <input
            type="checkbox"
            name="isPromoted"
            checked={form.isPromoted}
            onChange={handleChange}
            className="w-5 h-5 accent-indigo-500"
          />{" "}
          Promoted
        </label>
      </div>

      {/* Created By */}
      <div className="space-y-1">
        <label className="block text-gray-600 font-medium">Created By</label>
        <input
          name="createdBy"
          value={form.createdBy}
          onChange={handleChange}
          placeholder="Created By"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {/* Updated By */}
      <div className="space-y-1">
        <label className="block text-gray-600 font-medium">Updated By</label>
        <input
          name="updatedBy"
          value={form.updatedBy}
          onChange={handleChange}
          placeholder="Updated By"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        {isEdit ? "Update Category" : "Create Category"}
      </button>
    </form>
  );
};
