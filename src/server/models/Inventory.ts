import mongoose, { Schema, Document } from "mongoose";

export interface IInventory extends Document {
  vendorId?: mongoose.Types.ObjectId;
  
  // For restaurants
  preparationTime?: number;
  isVeg?: boolean;
  isCombo?: boolean;
  comboItems?: Array<{
    name: string;
    items: mongoose.Types.ObjectId[];
    price: number;
  }>;
  
  // For pharmacy
  prescriptionRequired?: boolean;
  batchNumber?: string;
  expiryDate?: Date;
  saltComposition?: string;
  
  // For tailoring
  isService?: boolean;
  duration?: number;
  serviceType?: string;
  
  // SEO / Search Metadata
  searchTags?: string[];
  keywords?: string[];
  metaDescription?: string;
  
  // Logistics Info
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  fragile?: boolean;
  
  name: string;
  description?: string;
  categoryId?: mongoose.Types.ObjectId;
  moduleId?: mongoose.Types.ObjectId;
  
  attributes?: Array<{
    name: string;
    value: string;
  }>;
  stock?: number;
  lowStockThreshold?: number;
  price: number;
  discountPrice?: number;
  tax?: number;
  sku: string;
  variants?: Array<{
    variantType: "size" | "color" | "flavor" | "material" | "custom";
    name: string;
    sizeSystem?: string;
    hexCode?: string;
    options?: Array<{
      label: string;
      price: number;
      stock?: number;
      sku?: string;
      images?: string[];
    }>;
  }>;
  images?: string[];
  status?: "active" | "inactive" | "out_of_stock";
  createdBy?: string;
  isDeleted?: boolean;
  approvalStatus?: "pending" | "approved" | "rejected";
  approvedBy?: mongoose.Types.ObjectId;
  customFields?: Array<{
    key: string;
    value: string;
  }>;
  
  createdAt: Date;
  updatedAt: Date;
}

const InventorySchema = new Schema({
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    required: false,
  },
  
  // For restaurants
  preparationTime: Number,
  isVeg: Boolean,
  isCombo: {
    type: Boolean,
    default: false,
  },
  comboItems: [{ 
    name: String, 
    items: [Schema.Types.ObjectId], 
    price: Number 
  }],
  
  // For pharmacy
  prescriptionRequired: Boolean,
  batchNumber: String,
  expiryDate: Date,
  saltComposition: String,
  
  // For tailoring
  isService: Boolean,
  duration: Number,
  serviceType: String,
  
  // SEO / Search Metadata
  searchTags: [String],
  keywords: [String],
  metaDescription: String,
  
  // Logistics Info
  weight: Number,
  dimensions: { 
    length: Number, 
    width: Number, 
    height: Number 
  },
  fragile: Boolean,
  
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  moduleId: {
    type: Schema.Types.ObjectId,
    ref: "Module",
    required: false,
  },
  
  attributes: [
    {
      name: String,
      value: String,
    },
  ],
  stock: {
    type: Number,
    required: false,
    min: 0,
  },
  lowStockThreshold: {
    type: Number,
    default: 10,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  tax: {
    type: Number,
    default: 0,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    default: () => `SKU-${Math.floor(Math.random() * 1000000)}`,
  },
  variants: [
    {
      variantType: {
        type: String,
        enum: ["size", "color", "flavor", "material", "custom"],
        required: true,
      },
      name: String,
      sizeSystem: String,
      hexCode: String,
      options: [
        {
          label: String,
          price: Number,
          stock: Number,
          sku: String,
          images: [String],
        }
      ]
    }
  ],
  images: [String],
  status: {
    type: String,
    enum: ["active", "inactive", "out_of_stock"],
    default: "active",
  },
  createdBy: { 
    type: String, 
    default: "system" 
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  approvalStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: "AreaManager",
  },
  customFields: [
    {
      key: String,
      value: String,
    }
  ]
}, { 
  timestamps: true 
});

// Add indexes
InventorySchema.index({ name: 1 });
InventorySchema.index({ sku: 1 });
InventorySchema.index({ status: 1 });
InventorySchema.index({ approvalStatus: 1 });

export default mongoose.models.Inventory || mongoose.model<IInventory>("Inventory", InventorySchema);