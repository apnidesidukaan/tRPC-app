import { useRouter } from "next/navigation";
import React from "react";
import {
  BiUser,
  BiMap,
  BiCurrentLocation,
} from "react-icons/bi";
import {
  
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
// =============================================================

const VendorsTable = ({
  users,
  handleUserClick,
  columns,
}) => {
console.log('users',users);

  const router = useRouter()
  // =============================================================
  return (
    <div className="md:col-span-6 bg-white rounded-xl shadow-md">
      <div className="w-[350px] sm:w-full md:w-[700px] lg:w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr
                key={user._id}
                // onClick={() => handleUserClick(user)}
                className="hover:bg-gray-50 transition duration-150 cursor-pointer"
              >
                <td
                  onClick={() => {
                    router.push(`/view-profile/${user.id}`)
                  }}
                  className="px-5 py-4 font-mono font-semibold text-blue-700 flex items-center gap-2 group relative">
                  {/* Avatar or fallback icon */}
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-blue-200 shadow"
                    />
                  ) : (
                    <BiUser className="w-8 h-8 text-blue-400 bg-blue-50 rounded-full p-1" />
                  )}
                  {/* Gradient name with tooltip */}
                  <span
                    className="bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 bg-clip-text text-transparent font-bold cursor-pointer transition group-hover:scale-105"
                    title={user.name}
                  >
                    {user.name.length > 18 ? user.name.slice(0, 16) + "…" : user.name}
                  </span>
                  {/* Tooltip for long names */}
                  {user.name.length > 18 && (
                    <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-white border px-2 py-1 rounded shadow text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                      {user.name}
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 font-mono text-gray-700">
                  {user.email}
                </td>
                <td className="px-5 py-4 font-mono text-gray-700">
                  {user.phone}
                </td>

                {/* ========================= companyName  =========================== */}


                {/* <td className="px-5 py-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <PiBuildingApartmentFill className="text-gray-500" />
                    <span className="truncate">{user.companyName ? user.companyName : user.name}</span>
                  </div>
                  <div className="text-xs text-gray-400">{user.details?.businessType ? user.details?.businessType : 'n/a'}</div>
                </td> */}
                {/* ========================= Location  =========================== */}
                <td className="px-5 py-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <BiMap className="text-gray-500" />
                    {/* <span className="truncate">{user.address}</span> */}
                  </div>
                </td>


                {/* {user.modules?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {user.modules.map((mod) => (
                      <div
                        key={mod._id}
                        className="relative group"
                      >
                        <img
                          src={mod.icon || "/default-icon.png"} 
                          alt={mod.name}
                          className="w-6 h-6 rounded-full object-contain border border-gray-300 shadow-sm cursor-pointer"
                        />
                        <div className="absolute z-10 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded shadow top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          {mod.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )} */}

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${user.status === "new"
                      ? "bg-green-100 text-green-700"
                      : user.status === "new"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {user.status === "new" ? (
                      <FaCheckCircle className="text-green-600" size={12} />
                    ) : (
                      <FaTimesCircle className="text-yellow-600" size={12} />
                    )}
                    {user.status}
                  </span>
                </td>
                {/*=========================== Timestamp ===========================*/}
                <td className="px-5 py-4 text-gray-500">
                  {user.updatedAt
                    ? formatDate(user.updatedAt, true)
                    : "—"}
                </td>



                {/*  STATUS ================ */}
                {/* <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${user.status === "new"
                      ? "bg-green-100 text-green-700"
                      : user.status === "new"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {user.status === "new" ? (
                      <FaCheckCircle className="text-green-600" size={12} />
                    ) : (
                      <FaTimesCircle className="text-yellow-600" size={12} />
                    )}
                    {user.status}
                  </span>
                </td> */}


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ==============================
// 📅 Date Formatter
function formatDate(dateString, withTime = false) {
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const suffix = getDaySuffix(day);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const time = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    return withTime
      ? `${day}${suffix} ${month}, ${year} @ ${time}`
      : `${day}${suffix} ${month}, ${year}`;
  } catch {
    return "Invalid date";
  }
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

export default VendorsTable;
