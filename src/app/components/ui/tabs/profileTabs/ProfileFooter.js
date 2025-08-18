import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

// ProfileFooter Component
export const ProfileFooter = ({ status, onConvert, isLoading }) => {
  if (status?.toLowerCase() === "converted") {
    return null; // Don't show footer if lead is converted
  }

  return (
    <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-gray-600 text-center sm:text-left">
        Ready to welcome this lead into our ecosystem?
      </div>

      <button
        onClick={onConvert}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2.5 px-5 sm:py-3 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 text-sm sm:text-base"
        disabled={isLoading}
      >
        {isLoading ? (
          <>Converting...</>
        ) : (
          <>
            <FaCheckCircle className="w-5 h-5" />
            Convert Lead
            <FaArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
};