"use client";
import { useState } from "react";
import { api } from "~/trpc/react";
import Layout from "../layouts/Layout";

export default function DiscoveryCreator() {
  const [type, setType] = useState<"category" | "product" | "inventory" | "module">("category");
  const [refIds, setRefIds] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  // 🎨 Visual settings
  const [theme, setTheme] = useState<"light" | "dark" | "custom">("light");
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [accentColor, setAccentColor] = useState("");
  const [layoutStyle, setLayoutStyle] = useState<"card" | "banner" | "minimal" | "glassmorphism">(
    "card"
  );
  const [customCss, setCustomCss] = useState("");

  // Dynamic fetching based on type
  const categories = api.category.getAll.useQuery(undefined, { enabled: type === "category" });
  const products = api.product.getAll.useQuery(undefined, { enabled: type === "product" });
  const inventory = api.inventory.getAll.useQuery(undefined, { enabled: type === "inventory" });
  const modules = api.module.getAll.useQuery(undefined, { enabled: type === "module" });

  const createDiscovery = api.discovery.create.useMutation();

  const handleSubmit = async () => {
    await createDiscovery.mutateAsync({
      title,
      type,
      refIds,
      description,
      image,
      isActive,
      isFeatured,
      theme,
      bgColor,
      textColor,
      accentColor,
      layoutStyle,
      customCss,
    });

    // reset
    setTitle("");
    setRefIds([]);
    setDescription("");
    setImage("");
    setIsActive(true);
    setIsFeatured(false);
    setTheme("light");
    setBgColor("");
    setTextColor("");
    setAccentColor("");
    setLayoutStyle("card");
    setCustomCss("");
  };

  const data =
    type === "category"
      ? categories.data
      : type === "product"
      ? products.data
      : type === "inventory"
      ? inventory.data
      : modules.data;

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Discovery Title</label>
          <input
            type="text"
            className="w-full border rounded-md p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Quick Meals → Ready-to-eat noodles"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            className="w-full border rounded-md p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description about this discovery"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="text"
            className="w-full border rounded-md p-2"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/banner.jpg"
          />
        </div>

        {/* Type Selector */}
        <div>
          <label className="block text-sm font-medium mb-2">Discovery Type</label>
          <select
            className="w-full border rounded-md p-2"
            value={type}
            onChange={(e) => {
              setType(e.target.value as any);
              setRefIds([]);
            }}
          >
            <option value="module">Module</option>
            <option value="category">Category</option>
            <option value="product">Product</option>
            <option value="inventory">Inventory</option>
          </select>
        </div>

        {/* RefIds Selector */}
        <div>
          <label className="block text-sm font-medium mb-2">Select {type}(s)</label>
          <div className="grid gap-2">
            {data?.map((item: any) => (
              <label key={item.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={refIds.includes(item.id)}
                  onChange={() =>
                    setRefIds((prev) =>
                      prev.includes(item.id)
                        ? prev.filter((id) => id !== item.id)
                        : [...prev, item.id]
                    )
                  }
                />
                <span>{item.name || item.title}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <span>Active</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            <span>Featured</span>
          </label>
        </div>

        {/* 🎨 Visual Settings */}
        <div className="border-t pt-4 space-y-4">
          <h2 className="text-lg font-semibold">Visual Settings</h2>

          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            <select
              className="w-full border rounded-md p-2"
              value={theme}
              onChange={(e) => setTheme(e.target.value as any)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Background Color</label>
            <input
              type="text"
              className="w-full border rounded-md p-2"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              placeholder="#FFFFFF or bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Text Color</label>
            <input
              type="text"
              className="w-full border rounded-md p-2"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              placeholder="#000000 or text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Accent Color</label>
            <input
              type="text"
              className="w-full border rounded-md p-2"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              placeholder="#FF5733"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Layout Style</label>
            <select
              className="w-full border rounded-md p-2"
              value={layoutStyle}
              onChange={(e) => setLayoutStyle(e.target.value as any)}
            >
              <option value="card">Card</option>
              <option value="banner">Banner</option>
              <option value="minimal">Minimal</option>
              <option value="glassmorphism">Glassmorphism</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Custom CSS</label>
            <textarea
              className="w-full border rounded-md p-2"
              value={customCss}
              onChange={(e) => setCustomCss(e.target.value)}
              placeholder="Optional Tailwind utility classes"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create Discovery Campaign
        </button>
      </div>
    </Layout>
  );
}
