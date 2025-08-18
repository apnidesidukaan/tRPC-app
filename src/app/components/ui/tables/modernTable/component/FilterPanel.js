// components/inventory/FilterPanel.jsx
import React from "react";
import { moduleIcons, categoryIcons, commonIcons } from "../constants/icons";

const { FaCheck, FaCheckIcon, FaTimesIcon } = commonIcons;

const FilterPanel = ({ isFilterPanelOpen, filtersConfig = [], filters, toggleFilter }) => {
    if (!isFilterPanelOpen) return null;

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtersConfig.map((filterGroup, groupIndex) => (
                <div key={groupIndex}>
                    <h3 className="font-medium text-gray-700 mb-3">{filterGroup.label}</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {filterGroup?.options?.map((option, index) => {
                            const isSelected = filters[filterGroup.key]?.includes(option.value);
                        
                            return (
                                <div key={index} className="flex items-center">
                                    <button
                                        onClick={(e) => toggleFilter(filterGroup.key, option.value, e)}
                                        className="flex items-center w-full"
                                    >
                                        <div
                                            className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? "bg-blue-500 border-blue-500" : "border-gray-300"
                                                }`}
                                        >
                                            {isSelected && <FaCheck size={12} className="text-white" />}
                                        </div>
                                        <span className="ml-3 text-gray-700 flex items-center">
                                            {option.icon? <span className="mr-2">{ option.icon}</span> : null}
                                            {option.label}
                                        </span>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FilterPanel;
