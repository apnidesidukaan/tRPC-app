import { FaBuilding, FaCalendarAlt, FaChartLine, FaClock, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhone, FaStar, FaTag, FaUser, FaUsers } from "react-icons/fa";

// OverviewTabContent Component
export const OverviewTabContent = ({
  companyName,
  leadType,
  source,
  email,
  phone,
  address,
  createdAt,
  updatedAt,
}) => {
  const getSourceIcon = (source) => {
    switch (source?.toLowerCase()) {
      case "website":
        return <FaGlobe className="w-4 h-4" />;
      case "social":
        return <FaUsers className="w-4 h-4" />;
      case "referral":
        return <FaStar className="w-4 h-4" />;
      default:
        return <FaTag className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FaBuilding className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-medium">Company</p>
              <p className="text-base sm:text-lg font-bold text-blue-900">
                {companyName || "Individual"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600 rounded-lg">
              <FaChartLine className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700 font-medium">Lead Type</p>
              <p className="text-base sm:text-lg font-bold text-green-900 capitalize">
                {leadType}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              {getSourceIcon(source)}
            </div>
            <div>
              <p className="text-sm text-purple-700 font-medium">Source</p>
              <p className="text-base sm:text-lg font-bold text-purple-900 capitalize">
                {source}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaUser className="w-5 h-5" />
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FaEnvelope className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-gray-900 text-sm sm:text-base">{email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaPhone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Phone</p>
                <p className="text-gray-900 text-sm sm:text-base">{phone}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Address</p>
                <p className="text-gray-900 text-sm sm:text-base">
                  {address || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaClock className="w-5 h-5" />
          Timeline
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <FaCalendarAlt className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Lead Created</p>
              <p className="text-xs text-gray-600">{formatDate(createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <FaClock className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Last Updated</p>
              <p className="text-xs text-gray-600">{formatDate(updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};