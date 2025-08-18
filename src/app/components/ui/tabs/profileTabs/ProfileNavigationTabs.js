import { FaBriefcase, FaClipboardList, FaClock, FaCog, FaCreditCard, FaFileAlt, FaUser } from "react-icons/fa";

// ProfileNavigationTabs Component
export const ProfileNavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: FaUser },
    { id: "details", label: "Details", icon: FaFileAlt },
    { id: "modules", label: "Modules", icon: FaBriefcase },
    { id: "tasks", label: "Tasks", icon: FaClipboardList },
    { id: "notes", label: "Notes", icon: FaFileAlt },
    { id: "history", label: "History", icon: FaClock },
    { id: "settings", label: "Settings", icon: FaCog },
    { id: "waalet", label: "Wallet", icon: FaCreditCard },
  ];

  return (
    <div className="border-b border-gray-200 bg-gray-50 overflow-x-auto whitespace-nowrap scrollbar-hide">
      <div className="inline-flex justify-start">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center flex-shrink-0 px-4 py-3 sm:px-6 sm:py-4 font-medium transition-all duration-200 text-sm sm:text-base
                                ${
                                  activeTab === tab.id
                                    ? "bg-white text-accent border-b-2 border-accent"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};