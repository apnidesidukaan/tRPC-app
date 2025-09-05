"use client";
import React, { useState, useEffect } from "react";
import {

    FaClock,
    FaFileAlt,
    FaClipboardList,
    FaCog,
    FaCreditCard,
} from "react-icons/fa";

import { DetailsTabContent } from "./profileTabs/DetailsTabContent";
import { ModulesTabContent } from "./profileTabs/ModulesTabContent";
import { EmptyTabContent } from "./profileTabs/EmptyTabContent";
import { OverviewTabContent } from "./profileTabs/OverviewTabContent";
import { ProfileNavigationTabs } from "./profileTabs/ProfileNavigationTabs";
import { ProfileHeader } from "./profileTabs/ProfileHeader";
import { useParams, useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import MyWallet from "./profileTabs/Wallet";
// import MyWallet from "./profileTabs/Wallet";

// ========================================================================================

const ProfileTabs = ({ }) => {
    // const data = []
    const params = useParams();  // gets the dynamic segments
    // const { type, id } = params;

    const { data } = api.vendor.getProfile.useQuery({ vendorId: String(params.id) });

    // console.log('vendors========',data?.profile);
    // ========================================================================================
    // console.log('ProfileTabs component initialized with data:', data);


    // const [rowData, setRowData] = useState(data);
    const [loadingLead, setLoadingLead] = useState(false);
    const [leadError, setLeadError] = useState(null);

    const [apiResponse, setApiResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [confirmConvert, setConfirmConvert] = useState(false); // Renamed from confirmDelete for clarity
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    // ========================================================================================


    if (loadingLead) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-xl text-gray-700">Loading Lead Profile...</div>
            </div>
        );
    }

    if (leadError) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-50">
                <div className="text-xl text-red-700">{leadError}</div>
            </div>
        );
    }


    // const {
    //     name,
    //     email,
    //     mobile,
    //     address,
    //     companyName,
    //     leadType,
    //     source,
    //     status,
    //     details = {},
    //     modules = [],
    //     createdAt,
    //     updatedAt,
    // } = data?.profile;

    const tabContent = {
        overview: (
            <OverviewTabContent
                companyName={data?.profile?.companyName}
                leadType={data?.profile?.leadType}
                source={data?.profile?.source}
                email={data?.profile?.email}
                phone={data?.profile?.mobile}
                address={data?.profile?.address}
                createdAt={data?.profile?.createdAt}
                updatedAt={data?.profile?.updatedAt}
            />
            // <EmptyTabContent
            //     icon={FaClipboardList}
            //     title="Tasks"
            //     message="Tasks related to this lead will appear here."
            // />
        ),
        details: <DetailsTabContent details={data} />,
        modules: <ModulesTabContent modules={data} />,
        tasks: (
            <EmptyTabContent
                icon={FaClipboardList}
                title="Tasks"
                message="Tasks related to this lead will appear here."
            />
        ),
        notes: (
            <EmptyTabContent
                icon={FaFileAlt}
                title="Notes"
                message="All notes regarding this lead will be displayed here."
            />
        ),
        history: (
            <EmptyTabContent
                icon={FaClock}
                title="History"
                message="Activity history for this lead will be shown here."
            />
        ),
        settings: (
            <EmptyTabContent
                icon={FaCog}
                title="Settings"
                message="Settings specific to this lead can be configured here."
            />
        ),
        waalet: (
            // <EmptyTabContent
            //     icon={FaCog}
            //     title="Settings"
            //     message="Settings specific to this lead can be configured here."
            // />
            <MyWallet
                icon={FaCreditCard}
                title="Wallet Information"
                message="Wallet details will be displayed here."
            />
        ),
    };
    // ========================================================================================

    return (
        <div className="w-[400px] sm:w-full md:w-[700px] lg:w-full overflow-x-auto p-2">
            <div className="bg-white rounded-2xl shadow-xl mx-auto overflow-hidden">
                {/* <ProfileHeader name={name} email={data?.email} phone={mobile} status={status} /> */}

                <ProfileNavigationTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <div className="p-4 sm:p-6">{tabContent[activeTab]}</div>

                {/* <ProfileFooter
                    status={status}
                    onConvert={() => setConfirmConvert(true)}
                    isLoading={isLoading}
                /> */}


            </div>
        </div>
    );
};
// ========================================================================================

export default ProfileTabs;