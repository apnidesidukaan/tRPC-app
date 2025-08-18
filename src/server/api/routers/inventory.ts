import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const inventoryRouter = createTRPCRouter({
    // Create a new inventory item
    create: publicProcedure
        .input(
            z.object({
                name: z.string().min(1),
                description: z.string().optional(),
                price: z.number().min(0).optional(),
                stock: z.number().min(0).optional(),
                sku: z.string().optional(),
                categoryId: z.string().optional(),
                productId: z.string(),

                // For restaurants
                preparationTime: z.number().optional(),
                isVeg: z.boolean().optional(),
                isCombo: z.boolean().optional(),
                comboItems: z.any().optional(),

                // For pharmacy
                prescriptionRequired: z.boolean().optional(),
                batchNumber: z.string().optional(),
                expiryDate: z.date().optional(),
                saltComposition: z.string().optional(),

                // For tailoring
                isService: z.boolean().optional(),
                duration: z.number().optional(),
                serviceType: z.string().optional(),

                // SEO / Search Metadata
                searchTags: z.array(z.string()).optional(),
                keywords: z.array(z.string()).optional(),
                metaDescription: z.string().optional(),
                metaImage: z.string().optional(),

                // Logistics Info (vendor overrides)
                weight: z.number().optional(),
                dimensions: z.any().optional(),
                fragile: z.boolean().optional(),

                images: z.array(z.string()).optional(),
                status: z.string().optional(),
                approvalStatus: z.string().optional(),
                customFields: z.any().optional(),

                createdById: z.string().optional(),
                approvedById: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const sku = input.sku || `SKU-${Math.floor(Math.random() * 1000000)}`;

            const inventory = await db.inventory.create({
                data: {
                    name: input.name,
                    description: input.description,
                    productId: input.productId,
                    price: input.price,
                    stock: input.stock ?? 0,
                    sku,
                    categoryId: input.categoryId || '68a1924a452f4990504f3f1a',
                    productId: input.productId,
                    preparationTime: input.preparationTime,
                    isVeg: input.isVeg,
                    isCombo: input.isCombo ?? false,
                    comboItems: input.comboItems,
                    prescriptionRequired: input.prescriptionRequired,
                    batchNumber: input.batchNumber,
                    expiryDate: input.expiryDate,
                    saltComposition: input.saltComposition,
                    isService: input.isService,
                    duration: input.duration,
                    serviceType: input.serviceType,
                    searchTags: input.searchTags ?? [],
                    keywords: input.keywords ?? [],
                    metaDescription: input.metaDescription,
                    metaImage: input.metaImage,
                    weight: input.weight,
                    dimensions: input.dimensions,
                    fragile: input.fragile,
                    images: input.images ?? [],
                    status: input.status ?? "active",
                    approvalStatus: input.approvalStatus ?? "pending",
                    customFields: input.customFields,
                    createdById: input.createdById,
                    approvedById: input.approvedById,
                },
            });

            return inventory;
        }),

    // Get all inventory items
    getAll: publicProcedure
        .query(async () => {
            const inventories = await db.inventory.findMany({
                where: { isDeleted: { not: true } },
                orderBy: { createdAt: "desc" },
            });
            return inventories;
        }),

    // Get inventory item by ID
    getById: publicProcedure
        .input(z.string())
        .query(async ({ input }) => {
            const inventory = await db.inventory.findUnique({
                where: { id: input },
            });
            return inventory;
        }),

    // Update inventory item
    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                data: z.object({
                    name: z.string().min(1).optional(),
                    description: z.string().optional(),
                    price: z.number().min(0).optional(),
                    stock: z.number().min(0).optional(),
                    sku: z.string().optional(),
                    categoryId: z.string().optional(),
                    productId: z.string().optional(),

                    // For restaurants
                    preparationTime: z.number().optional(),
                    isVeg: z.boolean().optional(),
                    isCombo: z.boolean().optional(),
                    comboItems: z.any().optional(),

                    // For pharmacy
                    prescriptionRequired: z.boolean().optional(),
                    batchNumber: z.string().optional(),
                    expiryDate: z.date().optional(),
                    saltComposition: z.string().optional(),

                    // For tailoring
                    isService: z.boolean().optional(),
                    duration: z.number().optional(),
                    serviceType: z.string().optional(),

                    // SEO / Search Metadata
                    searchTags: z.array(z.string()).optional(),
                    keywords: z.array(z.string()).optional(),
                    metaDescription: z.string().optional(),
                    metaImage: z.string().optional(),

                    // Logistics Info (vendor overrides)
                    weight: z.number().optional(),
                    dimensions: z.any().optional(),
                    fragile: z.boolean().optional(),

                    images: z.array(z.string()).optional(),
                    status: z.string().optional(),
                    approvalStatus: z.string().optional(),
                    customFields: z.any().optional(),

                    updatedById: z.string().optional(),
                    approvedById: z.string().optional(),
                }),
            })
        )
        .mutation(async ({ input }) => {
            const { id, data } = input;

            const inventory = await db.inventory.update({
                where: { id },
                data: {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    sku: data.sku,
                    categoryId: data.categoryId || undefined,
                    productId: data.productId || undefined,
                    preparationTime: data.preparationTime,
                    isVeg: data.isVeg,
                    isCombo: data.isCombo,
                    comboItems: data.comboItems,
                    prescriptionRequired: data.prescriptionRequired,
                    batchNumber: data.batchNumber,
                    expiryDate: data.expiryDate,
                    saltComposition: data.saltComposition,
                    isService: data.isService,
                    duration: data.duration,
                    serviceType: data.serviceType,
                    searchTags: data.searchTags,
                    keywords: data.keywords,
                    metaDescription: data.metaDescription,
                    metaImage: data.metaImage,
                    weight: data.weight,
                    dimensions: data.dimensions,
                    fragile: data.fragile,
                    images: data.images,
                    status: data.status,
                    approvalStatus: data.approvalStatus,
                    customFields: data.customFields,
                    approvedById: data.approvedById || undefined,
                },
            });

            return inventory;
        }),

    // Delete inventory item (soft delete)
    delete: protectedProcedure
        .input(z.string())
        .mutation(async ({ input }) => {
            const inventory = await db.inventory.update({
                where: { id: input },
                data: { isDeleted: true },
            });
            return inventory;
        }),

    // Search inventory items
    search: publicProcedure
        .input(z.object({
            query: z.string().optional(),
            categoryId: z.string().optional(),
            status: z.string().optional(),
            minPrice: z.number().optional(),
            maxPrice: z.number().optional(),
        }))
        .query(async ({ input }) => {
            const { query, categoryId, status, minPrice, maxPrice } = input;

            const inventories = await db.inventory.findMany({
                where: {
                    AND: [
                        query ? {
                            OR: [
                                { name: { contains: query, mode: "insensitive" } },
                                { description: { contains: query, mode: "insensitive" } },
                                { searchTags: { has: query } },
                                { keywords: { has: query } },
                            ],
                        } : {},
                        categoryId ? { categoryId } : {},
                        status ? { status } : {},
                        minPrice || maxPrice ? {
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                        } : {},
                        { isDeleted: { not: true } },
                    ],
                },
                orderBy: { createdAt: "desc" },
            });

            return inventories;
        }),


    // Get inventory items by Category
    getByCategory: publicProcedure
        .input(z.string()) // categoryId
        .query(async ({ input }) => {
            const inventories = await db.inventory.findMany({
                where: {
                    productId: input,
                    isDeleted: { not: true },
                },
                orderBy: { createdAt: "desc" },
            });
            return inventories;
        }),

});