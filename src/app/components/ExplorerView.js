'use client'
import { useState, useEffect } from "react";
import Header from "./ui/tables/modernTable/component/Header"; // Adjust path as needed
import SearchBar from "./ui/tables/modernTable/component/SearchBar"; // Adjust path as needed
import ActiveFilters from "./ui/tables/modernTable/component/ActiveFilters"; // Adjust path as needed
import FilterPanel from "./ui/tables/modernTable/component/FilterPanel"; // Adjust path as needed
import Summary from "./ui/tables/modernTable/component/Summary"; // Adjust path as needed
import Table from "./ui/tables/modernTable/component/Table"; // Adjust path as needed
import OrdersTable from "./ui/tables/modernTable/component/Table-orders"; // Adjust path as needed
import Grid from "./ui/tables/modernTable/component/Grid"; // Adjust path as needed
import LeadDetailModal from "./ui/tables/modernTable/component/LeadDetailModal"; // Adjust path as needed
import UserTable from "./ui/tables/modernTable/component/Table-user";

import { moduleIcons, categoryIcons, statusIcons, commonIcons } from '../components/ui/tables/modernTable/constants/icons'; // Adjust path
import VendorsTable from "./ui/tables/modernTable/component/Table-vendor";
import DeliveryPartnerTable from "./ui/tables/modernTable/component/Table-dp";

export default function ExplorerView({
    headerTitle,
    headerIcon,
    data,
    columns,
    tableType,


    filtersConfig,


}) {



    // State for dataArray data
    const [dataArray, setDataArray] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setDataArray(data);
        }
    }, [data]);



    // Filter states and UI states
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [sort, setSort] = useState({
        field: "name",
        direction: "asc"
    });
    const [viewMode, setViewMode] = useState("table"); // table or grid
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);


    // Toggle item in filter
    const toggleFilter = (filterType, value, event) => {
        if (event) {
            event.stopPropagation();
        }

        setFilters(prev => {
            if (prev[filterType].includes(value)) {
                return {
                    ...prev,
                    [filterType]: prev[filterType].filter(item => item !== value)
                };
            } else {
                return {
                    ...prev,
                    [filterType]: [...prev[filterType], value]
                };
            }
        });
    };

    // Clear all filters
    const clearFilters = () => {
        setFilters({
            modules: [],
            categories: [],
            status: []
        });
        setSearchTerm("");
    };






    const initialFilters = filtersConfig.reduce((acc, filter) => {
        acc[filter.key] = [];
        return acc;
    }, {});
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        let result = [...dataArray];

        // 1. Apply search filter (still custom logic)
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(item =>
                item.name?.toLowerCase().includes(term) ||
                item.sku?.toLowerCase().includes(term)
            );
        }

        // 2. Apply dynamic filters
        filtersConfig.forEach(config => {
            const { key } = config;
            const selectedValues = filters[key];

            if (Array.isArray(selectedValues) && selectedValues.length > 0) {
                result = result.filter(item => {
                    console.log('selectedValues.includes(item[key]); ====', selectedValues, (item[key]));

                    // This line was the issue. It should directly check item[key]
                    return selectedValues.includes(item[key]);
                });
            }
        });

        // 3. Apply sorting
        result.sort((a, b) => {
            const fieldA = a[sort.field];
            const fieldB = b[sort.field];

            if (typeof fieldA === 'string') {
                return sort.direction === 'asc'
                    ? fieldA.localeCompare(fieldB)
                    : fieldB.localeCompare(fieldA);
            } else {
                return sort.direction === 'asc' ? fieldA - fieldB : fieldB - fieldA;
            }
        });

        setFilteredData(result);
    }, [searchTerm, filters, dataArray, sort]);
    // Change sort
    const handleSort = (field, toggleDirection = false) => {
        setSort(prev => ({
            field,
            direction: toggleDirection && prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };



    const getFilterCount = () => {
        return Object.values(filters).reduce((total, filterArray) => {
            return total + (Array.isArray(filterArray) ? filterArray.length : 0);
        }, 0);
    };

    // Handle filter panel toggle
    const toggleFilterPanel = () => {
        setIsFilterPanelOpen(!isFilterPanelOpen);
    };

    // Handle product click to show details
    const handleRowClick = (product) => {
        setSelectedRow(product);
        setIsModalOpen(true)
    };

    // Close product detail modal
    const closeProductDetail = () => {
        setSelectedRow(null);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Header
                    headerTitle={headerTitle}
                    headerIcon={headerIcon}
                    toggleFilterPanel={toggleFilterPanel}
                    getFilterCount={getFilterCount}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />

                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <ActiveFilters
                    filterMeta={filtersConfig}

                    filters={filters}
                    toggleFilter={toggleFilter}
                    clearFilters={clearFilters}
                />

                <FilterPanel
                    isFilterPanelOpen={isFilterPanelOpen}
                    filters={filters}
                    toggleFilter={toggleFilter}
                    filtersConfig={filtersConfig}
                />

                <Summary
                    filteredCount={filteredData.length}
                    totalCount={dataArray.length}
                    sort={sort}
                    handleSort={handleSort}
                />

                {filteredData.length > 0 ? (
                    <>
                        {viewMode === "table" ? (
                            (() => {
                                switch (tableType) {
                                    case "orders":
                                        return (
                                            <OrdersTable
                                                columns={columns}
                                                orders={filteredData}
                                                handleOrderClick={handleRowClick}
                                            />
                                        );
                                    case "leads":
                                        return (
                                            <UserTable
                                                columns={columns}
                                                users={filteredData}
                                                handleUserClick={handleRowClick}
                                            />
                                        );
                                    case "users":
                                        return (
                                            <UserTable
                                                columns={columns}
                                                users={filteredData}
                                                handleUserClick={handleRowClick}
                                            />
                                        );
                                    case "dp":
                                        return (
                                            <DeliveryPartnerTable
                                                columns={columns}
                                                users={filteredData}
                                                handleUserClick={handleRowClick}
                                            />
                                        );
                                    case "vendors":
                                        return (
                                            <VendorsTable
                                                columns={columns}
                                                users={filteredData}
                                                handleUserClick={handleRowClick}
                                            />
                                        );
                                    case "customers":
                                        return (
                                            <CustomersTable
                                                columns={columns}
                                                customers={filteredData}
                                                handleCustomerClick={handleRowClick}
                                            />
                                        );
                                    case "dataArray":
                                    default:
                                        return (
                                            <Table
                                                columns={columns}
                                                dataArray={filteredData}
                                                handleRowClick={handleRowClick}
                                            />
                                        );
                                }
                            })()
                        ) : (
                            <Grid
                                gridType={tableType}
                                dataArray={filteredData}
                                // handleUserClick={handleRowClick}

                                handleRowClick={handleRowClick}
                            />
                        )}
                    </>
                ) : (
                    <div className="text-gray-500 text-center py-8">No items found.</div>
                )}

            </div>

            {isModalOpen ?
                <LeadDetailModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    rowData={selectedRow}
                // onClose={closeProductDetail}
                /> : null}
        </div>
    );
}