import { FaBriefcase, FaCar, FaFileAlt, FaHashtag } from "react-icons/fa";
import { EmptyTabContent } from "./EmptyTabContent";

// DetailsTabContent Component
export const DetailsTabContent = ({ details }) => {
    return (
        <div className="space-y-6">
            {details.businessType ||
                details.taxId ||
                details.licenseNumber ||
                details.vehicleType ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {details.businessType && (
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                            <div className="flex items-center gap-3 mb-2">
                                <FaBriefcase className="w-5 h-5 text-orange-600" />
                                <h4 className="font-semibold text-orange-900 text-base">
                                    Business Type
                                </h4>
                            </div>
                            <p className="text-orange-800 text-sm sm:text-base">
                                {details.businessType}
                            </p>
                        </div>
                    )}

                    {details.taxId && (
                        <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-xl border border-teal-200">
                            <div className="flex items-center gap-3 mb-2">
                                <FaHashtag className="w-5 h-5 text-teal-600" />
                                <h4 className="font-semibold text-teal-900 text-base">
                                    Tax ID
                                </h4>
                            </div>
                            <p className="text-teal-800 font-mono text-sm sm:text-base">
                                {details.taxId}
                            </p>
                        </div>
                    )}

                    {details.licenseNumber && (
                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200">
                            <div className="flex items-center gap-3 mb-2">
                                <FaFileAlt className="w-5 h-5 text-indigo-600" />
                                <h4 className="font-semibold text-indigo-900 text-base">
                                    License Number
                                </h4>
                            </div>
                            <p className="text-indigo-800 font-mono text-sm sm:text-base">
                                {details.licenseNumber}
                            </p>
                        </div>
                    )}

                    {details.vehicleType && (
                        <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-4 rounded-xl border border-rose-200">
                            <div className="flex items-center gap-3 mb-2">
                                <FaCar className="w-5 h-5 text-rose-600" />
                                <h4 className="font-semibold text-rose-900 text-base">
                                    Vehicle Type
                                </h4>
                            </div>
                            <p className="text-rose-800 text-sm sm:text-base">
                                {details.vehicleType}
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <EmptyTabContent
                    icon={FaFileAlt}
                    title="No Additional Details"
                    message="No additional details have been provided for this lead."
                />
            )}
        </div>
    );
};