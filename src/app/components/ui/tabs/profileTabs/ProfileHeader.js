import { FaEnvelope, FaPhone } from "react-icons/fa";

// ProfileHeader Component
export const ProfileHeader = ({ name, email, phone, status }) => {
  // Helper functions (can be moved to a utils file if used elsewhere)
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "new":
        return {
          bg: "bg-gradient-to-r from-emerald-50 to-green-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
          icon: "🆕",
          ring: "ring-emerald-100",
        };
      case "contacted":
        return {
          bg: "bg-gradient-to-r from-blue-50 to-cyan-50",
          text: "text-blue-700",
          border: "border-blue-200",
          icon: "📞",
          ring: "ring-blue-100",
        };
      case "pending":
        return {
          bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
          text: "text-amber-700",
          border: "border-amber-200",
          icon: "⏳",
          ring: "ring-amber-100",
        };
      case "lost":
        return {
          bg: "bg-gradient-to-r from-red-50 to-rose-50",
          text: "text-red-700",
          border: "border-red-200",
          icon: "❌",
          ring: "ring-red-100",
        };
      case "converted":
        return {
          bg: "bg-gradient-to-r from-purple-50 to-indigo-50",
          text: "text-purple-700",
          border: "border-purple-200",
          icon: "✅",
          ring: "ring-purple-100",
        };
      default:
        return {
          bg: "bg-gradient-to-r from-gray-50 to-slate-50",
          text: "text-gray-700",
          border: "border-gray-200",
          icon: "📋",
          ring: "ring-gray-100",
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  return (
    <div className="relative bg-gradient-to-r from-[#ffdd8d] via-[#f1cf83] to-[#e3bf70] p-6 text-[#3d2701]  border border-[#3d2701] ring-2">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
              {name}
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-[#3d2701] ">
              <div className="flex items-center gap-2">
                <FaEnvelope className="w-4 h-4" />
                <span className="text-sm">{email}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="w-4 h-4" />
                <span className="text-sm">{phone}</span>
              </div>
            </div>
          </div>
          <div
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border backdrop-blur-sm`}
          >
            <div className="flex items-center gap-2 font-semibold text-sm sm:text-base">
              <span>{statusConfig.icon}</span>
              <span className="capitalize">{status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};