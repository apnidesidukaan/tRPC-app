// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { trpc } from "~/utils/trpc";

// const businessTypeEnum = [
//   "agriculture","mining","manufacturing","wholesale","retail","logistics",
//   "service","financial_services","transportation","utilities","entertainment",
//   "media","sports","real_estate","construction","technology","healthcare",
//   "education","hospitality","legal_services","consulting","non_profit",
//   "government","other"
// ] as const;

// const schema = z.object({
//   name: z.string().min(2),
//   type: z.enum(businessTypeEnum).default("other"),
//   description: z.string().optional(),
//   ownerId: z.string(),
//   modules: z.array(z.string()).optional(),
//   logo: z.string().url().optional(),
//   bannerImage: z.string().url().optional(),
//   website: z.string().url().optional(),
//   socialLinks: z.object({
//     instagram: z.string().url().optional(),
//     facebook: z.string().url().optional(),
//     linkedin: z.string().url().optional(),
//   }).optional(),
//   isActive: z.boolean().default(true),
// });

// type FormData = z.infer<typeof schema>;

// export function BusinessForm({ onSuccess }: { onSuccess?: () => void }) {
//   const utils = trpc.useUtils();
//   const createMutation = trpc.business.create.useMutation({
//     onSuccess: () => {
//       utils.business.getAll.invalidate();
//       reset();
//       onSuccess?.();
//     },
//   });

//   const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
//     resolver: zodResolver(schema),
//     defaultValues: { type: "other", isActive: true },
//   });

//   const onSubmit = (data: FormData) => {
//     createMutation.mutate(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-4 rounded shadow">
//       <div>
//         <label className="block mb-1 font-semibold">Business Name</label>
//         <input {...register("name")} className="border rounded p-2 w-full" />
//         {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
//       </div>

//       <div>
//         <label className="block mb-1 font-semibold">Type</label>
//         <select {...register("type")} className="border rounded p-2 w-full">
//           {businessTypeEnum.map((t) => (
//             <option key={t} value={t}>{t}</option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label className="block mb-1 font-semibold">Description</label>
//         <textarea {...register("description")} className="border rounded p-2 w-full" />
//       </div>

//       <div>
//         <label className="block mb-1 font-semibold">Logo URL</label>
//         <input {...register("logo")} className="border rounded p-2 w-full" />
//       </div>

//       <div>
//         <label className="block mb-1 font-semibold">Website</label>
//         <input {...register("website")} className="border rounded p-2 w-full" />
//       </div>

//       <div className="grid grid-cols-3 gap-2">
//         <input placeholder="Instagram URL" {...register("socialLinks.instagram")} className="border rounded p-2" />
//         <input placeholder="Facebook URL" {...register("socialLinks.facebook")} className="border rounded p-2" />
//         <input placeholder="LinkedIn URL" {...register("socialLinks.linkedin")} className="border rounded p-2" />
//       </div>

//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//         Create Business
//       </button>
//     </form>
//   );
// }
