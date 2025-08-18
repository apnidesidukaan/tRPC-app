import React from 'react';
import { moduleIcons, categoryIcons, statusIcons, commonIcons } from '../constants/icons'; // Adjust path

const { FaTimes } = commonIcons;



const ActiveFilters = ({ filters, toggleFilter, clearFilters, filterMeta }) => {
    // console.log('=========== filterMeta', filterMeta, filters);

    // ✅ Convert filterMeta array to object map { [key]: { label, icons: { value: JSX } } }
    const metaMap = React.useMemo(() => {
        const map = {};

        filterMeta.forEach(meta => {
            const iconMap = {};
            meta.options.forEach(opt => {
                iconMap[opt.value] = opt.icon;
            });

            map[meta.key] = {
                label: meta.label,
                icons: iconMap
            };
        });

        return map;
    }, [filterMeta]);

    const getDisplayedFilters = () => {
        const allFilters = [];

        Object.entries(filters).forEach(([key, values]) => {
            if (Array.isArray(values) && values.length > 0) {
                values.forEach(value => {
                    allFilters.push({ type: key, value });
                });
            }
        });

        return allFilters;
    };

    const displayedFilters = getDisplayedFilters();
    if (displayedFilters.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm font-medium text-gray-500">Active filters:</span>

            {displayedFilters.map((filter, index) => {
                const meta = metaMap[filter.type] || {};
                const Icon = meta.icons?.[filter.value];

                return (
                    <div
                        key={index}
                        className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-1 text-sm"
                    >
                        <span className="capitalize mr-1">{meta.label || filter.type}:</span>
                        <span className="font-medium flex items-center">
                            {Icon && <span className="mr-1">{typeof Icon === 'function' ? <Icon /> : Icon}</span>}
                            {filter.value}
                        </span>
                        <button
                            onClick={() => toggleFilter(filter.type, filter.value)}
                            className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                            <FaTimes size={14} />
                        </button>
                    </div>
                );
            })}

            <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
                Clear all
            </button>
        </div>
    );
};
export default ActiveFilters;
