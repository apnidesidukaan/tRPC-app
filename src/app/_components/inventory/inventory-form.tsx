"use client";

import { InfoIcon } from "lucide-react";
import { useState } from "react";
import { FaFileMedicalAlt, FaSave, FaTimes, } from "react-icons/fa";
import { MdInventory, } from "react-icons/md";
import { BasicInfoTab } from "./tabs/basic";
import { api } from "~/trpc/react";
import { useRouter, useParams } from 'next/navigation';
import { MdPermMedia } from "react-icons/md";
import { MarketingTab } from "./tabs/marketing";

// ===============================================================================
type VariantOption = {
  id?: string; // for updating an existing option
  label: string;
  price: number;
  stock?: number;
  sku?: string;
  images?: string[];
};

type Variant = {
  id?: string; // for updating an existing variant
  variantType: "size" | "color" | "flavor" | "material" | "custom";
  name: string;
  sizeSystem?: string;
  hexCode?: string;
  options: VariantOption[];
};

type Dimensions = {
  length: number;
  width: number;
  height: number;
};

type InventoryFormData = {
  id?: string;
  name: string;
  description?: string;
  price?: number;
  stock?: number;
  sku?: string;
  categoryId?: string;
  moduleId?: string;
  brand?: string;

  // Food/Restaurant
  preparationTime?: number;
  isVeg?: boolean;
  isCombo?: boolean;

  // Pharmacy
  prescriptionRequired?: boolean;
  batchNumber?: string;
  expiryDate?: Date;
  saltComposition?: string;

  // Services
  isService?: boolean;
  duration?: number;
  serviceType?: string;

  // SEO / Search
  searchTags?: string[];
  keywords?: string[];
  metaDescription?: string;

  // Physical Goods
  weight?: number;
  dimensions?: Dimensions;
  fragile?: boolean;
  images?: string[];

  // Status
  status?: string;
  approvalStatus?: string;

  // Variants
  variants?: Variant[];
};

type InventoryFormProps = {
  initialData?: InventoryFormData;
  onSubmit: (data: InventoryFormData) => void;
};

// ===============================================================================
export const InventoryForm = ({
  initialData,
  // isSubmitting = false
}: InventoryFormProps) => {

  // ===============================================================================v
  const isEdit = Boolean(initialData?.id);


  const router = useRouter();
  const params = useParams();

  // console.log(params);

  const { mutate: createInventory, isPending: isCreated } = api.inventory.create.useMutation({  });
  const { mutate: updateInventory, isPending: isUpdated } = api.inventory.update.useMutation({  });

  // ===============================================================================v
  const [formData, setFormData] = useState({
    // Relations
    productId: params?.productId ?? "",
    categoryId: initialData?.categoryId ?? "",
    createdById: initialData?.createdById ?? "",
    approvedById: initialData?.approvedById ?? "",

    // General info
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
    sku: initialData?.sku ?? "",
    status: initialData?.status ?? "active",
    approvalStatus: initialData?.approvalStatus ?? "pending",

    // Pricing & stock
    price: initialData?.price ?? 0,
    discountPrice: initialData?.discountPrice ?? 0,
    tax: initialData?.tax ?? 0,
    stock: initialData?.stock ?? 0,
    lowStockThreshold: initialData?.lowStockThreshold ?? 10,

    // Category & images
    images: initialData?.images ?? [],

    // Restaurant
    preparationTime: initialData?.preparationTime ?? 0,
    isVeg: initialData?.isVeg ?? false,
    isCombo: initialData?.isCombo ?? false,
    comboItems: initialData?.comboItems ?? null,

    // Pharmacy
    prescriptionRequired: initialData?.prescriptionRequired ?? false,
    batchNumber: initialData?.batchNumber ?? "",
    expiryDate: initialData?.expiryDate ?? new Date(),
    saltComposition: initialData?.saltComposition ?? "",

    // Services (tailoring / others)
    isService: initialData?.isService ?? false,
    duration: initialData?.duration ?? 0,
    serviceType: initialData?.serviceType ?? "",

    // SEO / search metadata
    searchTags: initialData?.searchTags ?? [],
    keywords: initialData?.keywords ?? [],
    metaDescription: initialData?.metaDescription ?? "",
    metaImage: initialData?.metaImage ?? "",

    // Logistics
    weight: initialData?.weight ?? 0,
    dimensions: initialData?.dimensions ?? {
      length: 0,
      width: 0,
      height: 0,
    },
    fragile: initialData?.fragile ?? false,

    // Custom fields
    attributes: initialData?.attributes ?? null,
    customFields: initialData?.customFields ?? null,

    // System
    isDeleted: initialData?.isDeleted ?? false,
  });


  const [searchTagsInput, setSearchTagsInput] = useState("");
  const [keywordsInput, setKeywordsInput] = useState("");
  const [activeSection, setActiveSection] = useState("basic");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    if (name.startsWith("dimensions.")) {
      const dimensionKey = name.split(".")[1] as keyof typeof formData.dimensions;
      setFormData({
        ...formData,
        dimensions: {
          ...formData.dimensions,
          [dimensionKey]: parseFloat(val as string) || 0,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "number" ? parseFloat(val as string) || 0 : val,
      });
    }
  };





  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    // if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    // if (formData.stock < 0) newErrors.stock = "Stock cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data: any = {
      ...formData,
      // slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
    };

    // Remove empty string values
    Object.keys(data).forEach(key => {
      if (data[key] === '') delete data[key];
    });

    if (isEdit && initialData?.id) {



      updateInventory({ id: initialData.id, data: { ...data } });
    } else {
      createInventory(data);
    }
  };


  const sections = [
    { id: "basic", label: "Basic Info", icon: <InfoIcon /> },
    { id: "marketing", label: "Marketing", icon: <MdPermMedia /> },

  ];



  // ===============================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* =============== Header  ==============================  */}


        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl mb-4">
            <MdInventory className="text-3xl text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {initialData?.id ? "Edit Inventory" : "Add New Inventory"}
          </h1>
          <p className="text-gray-300">
            Create amazing products with our advanced inventory management system
          </p>
        </div>
        {/* =============== Navigation Tabs  ==============================  */}

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${activeSection === section.id
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                }`}
            >
              {section.icon}
              <span className="hidden sm:inline">{section.label}</span>
            </button>
          ))}
        </div>
        {/* =============================================  */}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">

            {/* Basic Info Section */}
            {activeSection === "basic" && (
              <BasicInfoTab
                handleChange={handleChange}
                formData={formData}
                errors={errors}
              />
            )}
            {activeSection === "marketing" && (
              <MarketingTab
                handleChange={handleChange}
                formData={formData}
                errors={errors}
              />
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-red-400 font-bold bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <FaTimes />
              Cancel
            </button>
            <button
              type="submit"
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all duration-300 ${isCreated || isUpdated
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
                }`}
              disabled={isCreated || isUpdated}
            >
              {isCreated || isUpdated ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave />
                  Save Product
                </>
              )}
            </button>
          </div>

        </form>
        {/* =============================================  */}

      </div>
    </div>
  );
};
// ===============================================================================
