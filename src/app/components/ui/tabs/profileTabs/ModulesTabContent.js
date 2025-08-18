import { FaBriefcase } from "react-icons/fa";
import { EmptyTabContent } from "./EmptyTabContent";

// ModulesTabContent Component
export const ModulesTabContent = ({ modules }) => {
  return (
    <div className="space-y-6">
      {modules.length > 0 ? (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              Modules of Interest
            </h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
              {modules.length} {modules.length === 1 ? "Module" : "Modules"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <FaBriefcase className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 text-base">
                      {mod.name}
                    </h4>
                    {mod.description && (
                      <p className="text-sm text-blue-700">{mod.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <EmptyTabContent
          icon={FaBriefcase}
          title="No Modules Selected"
          message="This lead hasn't expressed interest in any specific modules yet."
        />
      )}
    </div>
  );
};