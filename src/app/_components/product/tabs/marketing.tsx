"use client";

import { useState } from "react";
import {
  FaTag,
  FaBoxOpen,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdInventory } from "react-icons/md";

// ===============================================================================

export const MarketingTab = ({ formData, handleChange, errors }) => {
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !formData.tags.includes(newTag)) {
      handleChange({
        target: {
          name: "tags",
          value: [...formData.tags, newTag],
        },
      });
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    handleChange({
      target: {
        name: "tags",
        value: formData.tags.filter((t) => t !== tagToRemove),
      },
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // ==============================================================================

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
          <MdInventory className="text-white text-xl" />
        </div>
        <h2 className="text-2xl font-bold text-white">Basic Information</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Image URL */}
        <div className="relative">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-200 mb-2">
            <FaBoxOpen className="text-indigo-400" />
            Product Image Url*
          </label>
          <input
            type="text"
            name="metaImage"
            value={formData.metaImage}
            onChange={handleChange}
            className={`w-full bg-white/10 backdrop-blur-md border rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${
              errors.metaImage
                ? "border-red-500 ring-2 ring-red-500/30"
                : "border-white/20 hover:border-white/40"
            }`}
          />
          {errors.metaImage && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <FaExclamationTriangle />
              {errors.metaImage}
            </p>
          )}
        </div>

        {/* Tags Input */}
        <div className="relative">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-200 mb-2">
            <FaTag className="text-indigo-400" />
            Product Tags
          </label>

          <div className="flex gap-2 flex-wrap bg-white/10 backdrop-blur-md border rounded-xl px-3 py-2">
            {formData.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-indigo-600 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-xs font-bold ml-1 hover:text-red-300"
                >
                  ×
                </button>
              </span>
            ))}

            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add tag..."
              className="bg-transparent text-white placeholder-gray-400 focus:outline-none px-1 py-0.5"
            />
          </div>
          {errors.tags && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <FaExclamationTriangle />
              {errors.tags}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ===============================================================================
