// import { trpc } from "~/utils/trpc";

// export function BusinessList() {
//   const { data: businesses, isLoading } = trpc.business.getAll.useQuery();
//   const softDelete = trpc.business.softDelete.useMutation({
//     onSuccess: () => utils.business.getAll.invalidate()
//   });
//   const utils = trpc.useUtils();

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <table className="w-full border">
//       <thead className="bg-gray-100">
//         <tr>
//           <th className="p-2 border">Name</th>
//           <th className="p-2 border">Type</th>
//           <th className="p-2 border">Active</th>
//           <th className="p-2 border">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {businesses?.map((b) => (
//           <tr key={b.id}>
//             <td className="p-2 border">{b.name}</td>
//             <td className="p-2 border">{b.type}</td>
//             <td className="p-2 border">{b.isActive ? "Yes" : "No"}</td>
//             <td className="p-2 border space-x-2">
//               <button className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
//               <button
//                 onClick={() => softDelete.mutate(b.id)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
