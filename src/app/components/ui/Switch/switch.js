import { useState } from "react";

export function Switch({ checked, onCheckedChange }) {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
        checked ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
}
