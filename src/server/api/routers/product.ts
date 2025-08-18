import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const productRouter = createTRPCRouter({
  // Create a new product
  create: publicProcedure
    .input(
      z.object({
        slug: z.string().optional(),
        name: z.string().min(1),
        subtitle: z.string().optional(),
        description: z.string().optional(),
        brand: z.string().optional(),
        manufacturer: z.string().optional(),
        manufacturerId: z.string().optional(),
        sku: z.string().optional(),
        gtin: z.string().optional(),
        upc: z.string().optional(),
        ean: z.string().optional(),
        isbn: z.string().optional(),
        hsCode: z.string().optional(),
        taxCode: z.string().optional(),
        countryOfOrigin: z.string().optional(),
        categoryId: z.string().optional(),
        categoryPath: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        price: z.number().optional(),
        mrp: z.number().optional(),
        cost: z.number().optional(),
        currency: z.string().optional(),
        tax: z.number().optional(),
        taxInclusive: z.boolean().optional(),
        discount: z.number().optional(),
        priceTiers: z.array(
          z.object({
            minQty: z.number(),
            unitPrice: z.number(),
            customerTag: z.string().optional(),
          })
        ).optional(),
        trackInventory: z.boolean().optional(),
        isBatchTracked: z.boolean().optional(),
        isSerialTracked: z.boolean().optional(),
        allowBackorder: z.boolean().optional(),
        stock: z.number().optional(),
        reorderPoint: z.number().optional(),
        safetyStock: z.number().optional(),
        leadTimeDays: z.number().optional(),
        weight: z.number().optional(),
        dimensions: z.object({
          length: z.number().optional(),
          width: z.number().optional(),
          height: z.number().optional(),
          unit: z.string().optional(),
        }).optional(),
        packageInfo: z.object({
          casePack: z.number().optional(),
          innerPack: z.number().optional(),
          packageNotes: z.string().optional(),
        }).optional(),
        shippingClass: z.string().optional(),
        freightClass: z.string().optional(),
        variants: z.array(
          z.object({
            variantType: z.string(),
            name: z.string().optional(),
            sizeSystem: z.string().optional(),
            hexCode: z.string().optional(),
            options: z.array(
              z.object({
                label: z.string(),
                price: z.number(),
                stock: z.number().optional(),
                sku: z.string().optional(),
                barcode: z.string().optional(),
                images: z.array(z.string()).optional(),
              })
            ),
          })
        ).optional(),
        isBundle: z.boolean().optional(),
        components: z.array(
          z.object({
            productId: z.string(),
            quantity: z.number(),
            required: z.boolean(),
            selectedOptions: z.any().optional(),
          })
        ).optional(),
        isDigital: z.boolean().optional(),
        digital: z.object({
          downloadUrls: z.array(z.string()).optional(),
          fileSizeMB: z.number().optional(),
          licenseType: z.string().optional(),
          licenseTerms: z.string().optional(),
          maxActivations: z.number().optional(),
          drm: z.boolean().optional(),
        }).optional(),
        isService: z.boolean().optional(),
        service: z.object({
          durationMins: z.number().optional(),
          serviceType: z.string().optional(),
          serviceArea: z.string().optional(),
          resourceHints: z.array(z.string()).optional(),
        }).optional(),
        isSubscription: z.boolean().optional(),
        subscription: z.object({
          billingCycle: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"]),
          intervalCount: z.number().optional(),
          trialDays: z.number().optional(),
          autoRenew: z.boolean().optional(),
          cancellationPolicy: z.string().optional(),
        }).optional(),
        images: z.array(z.string()).optional(),
        videos: z.array(z.string()).optional(),
        documents: z.array(z.string()).optional(),
        searchTags: z.array(z.string()).optional(),
        keywords: z.array(z.string()).optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        metaImage: z.string().optional(),
        ageRestriction: z.number().optional(),
        warnings: z.string().optional(),
        certifications: z.array(z.string()).optional(),
        allergens: z.array(z.string()).optional(),
        nutrition: z.any().optional(),
        shelfLifeDays: z.number().optional(),
        storageInstructions: z.string().optional(),
        warrantyMonths: z.number().optional(),
        careInstructions: z.string().optional(),
        channelSkus: z.array(
          z.object({
            channel: z.string(),
            sku: z.string(),
            price: z.number().optional(),
            live: z.boolean().optional(),
          })
        ).optional(),
        attributes: z.any().optional(),
        status: z.enum(["draft", "active", "inactive", "archived"]).optional(),
        approvalStatus: z.string().optional(),
        createdById: z.string().optional(),
        updatedById: z.string().optional(),
        approvedById: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const product = await db.product.create({
        data: {
          ...input,
          categoryPath: {
            set: input.categoryPath ?? [],
          },
          tags: {
            set: input.tags ?? [],
          },
          searchTags: {
            set: input.searchTags ?? [],
          },
          keywords: {
            set: input.keywords ?? [],
          },
          images: {
            set: input.images ?? [],
          },
          videos: {
            set: input.videos ?? [],
          },
          documents: {
            set: input.documents ?? [],
          },
          certifications: {
            set: input.certifications ?? [],
          },
          allergens: {
            set: input.allergens ?? [],
          },
          channelSkus: {
            set: input.channelSkus ?? [],
          },
        },
      });
      return product;
    }),

  // Get all products
  getAll: publicProcedure
    .query(async () => {
      const products = await db.product.findMany({
        where: { isDeleted: { not: true } },
        orderBy: { createdAt: "desc" },
      });
      return products;
    }),

  // Get product by ID
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const product = await db.product.findUnique({
        where: { id: input },
      });
      return product;
    }),


getInventoryCountByProductId: publicProcedure
  .input(z.string())
  .query(async ({ input }) => {
    const count = await db.inventory.count({
      where: { productId: input },
    });

    return { productId: input, count };
  }),



  // ✅ New procedure: Get products by categoryId
  getProductsByCategoryId: publicProcedure
    .input(z.string().optional()) // <-- accept undefined
    .query(async ({ input }) => {
      const products = await db.product.findMany({
        where: {
          categoryId: input,
          isDeleted: false,

        },
        include: {
          // category: true,   // get category details also
          inventories: true // get seller inventory data also
        },
      });
      return products;
    }),








  // Update product
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          slug: z.string().optional(),
          name: z.string().min(1).optional(),
          subtitle: z.string().optional(),
          description: z.string().optional(),
          brand: z.string().optional(),
          manufacturer: z.string().optional(),
          manufacturerId: z.string().optional(),
          sku: z.string().optional(),
          gtin: z.string().optional(),
          upc: z.string().optional(),
          ean: z.string().optional(),
          isbn: z.string().optional(),
          hsCode: z.string().optional(),
          taxCode: z.string().optional(),
          countryOfOrigin: z.string().optional(),
          categoryId: z.string().optional(),
          categoryPath: z.array(z.string()).optional(),
          tags: z.array(z.string()).optional(),
          price: z.number().optional(),
          mrp: z.number().optional(),
          cost: z.number().optional(),
          currency: z.string().optional(),
          tax: z.number().optional(),
          taxInclusive: z.boolean().optional(),
          discount: z.number().optional(),
          priceTiers: z.array(
            z.object({
              minQty: z.number(),
              unitPrice: z.number(),
              customerTag: z.string().optional(),
            })
          ).optional(),
          trackInventory: z.boolean().optional(),
          isBatchTracked: z.boolean().optional(),
          isSerialTracked: z.boolean().optional(),
          allowBackorder: z.boolean().optional(),
          stock: z.number().optional(),
          reorderPoint: z.number().optional(),
          safetyStock: z.number().optional(),
          leadTimeDays: z.number().optional(),
          weight: z.number().optional(),
          dimensions: z.object({
            length: z.number().optional(),
            width: z.number().optional(),
            height: z.number().optional(),
            unit: z.string().optional(),
          }).optional(),
          packageInfo: z.object({
            casePack: z.number().optional(),
            innerPack: z.number().optional(),
            packageNotes: z.string().optional(),
          }).optional(),
          shippingClass: z.string().optional(),
          freightClass: z.string().optional(),
          variants: z.array(
            z.object({
              variantType: z.string(),
              name: z.string().optional(),
              sizeSystem: z.string().optional(),
              hexCode: z.string().optional(),
              options: z.array(
                z.object({
                  label: z.string(),
                  price: z.number(),
                  stock: z.number().optional(),
                  sku: z.string().optional(),
                  barcode: z.string().optional(),
                  images: z.array(z.string()).optional(),
                })
              ),
            })
          ).optional(),
          isBundle: z.boolean().optional(),
          components: z.array(
            z.object({
              productId: z.string(),
              quantity: z.number(),
              required: z.boolean(),
              selectedOptions: z.any().optional(),
            })
          ).optional(),
          isDigital: z.boolean().optional(),
          digital: z.object({
            downloadUrls: z.array(z.string()).optional(),
            fileSizeMB: z.number().optional(),
            licenseType: z.string().optional(),
            licenseTerms: z.string().optional(),
            maxActivations: z.number().optional(),
            drm: z.boolean().optional(),
          }).optional(),
          isService: z.boolean().optional(),
          service: z.object({
            durationMins: z.number().optional(),
            serviceType: z.string().optional(),
            serviceArea: z.string().optional(),
            resourceHints: z.array(z.string()).optional(),
          }).optional(),
          isSubscription: z.boolean().optional(),
          subscription: z.object({
            billingCycle: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"]),
            intervalCount: z.number().optional(),
            trialDays: z.number().optional(),
            autoRenew: z.boolean().optional(),
            cancellationPolicy: z.string().optional(),
          }).optional(),
          images: z.array(z.string()).optional(),
          videos: z.array(z.string()).optional(),
          documents: z.array(z.string()).optional(),
          searchTags: z.array(z.string()).optional(),
          keywords: z.array(z.string()).optional(),
          metaTitle: z.string().optional(),
          metaDescription: z.string().optional(),
          metaImage: z.string().optional(),
          ageRestriction: z.number().optional(),
          warnings: z.string().optional(),
          certifications: z.array(z.string()).optional(),
          allergens: z.array(z.string()).optional(),
          nutrition: z.any().optional(),
          shelfLifeDays: z.number().optional(),
          storageInstructions: z.string().optional(),
          warrantyMonths: z.number().optional(),
          careInstructions: z.string().optional(),
          channelSkus: z.array(
            z.object({
              channel: z.string(),
              sku: z.string(),
              price: z.number().optional(),
              live: z.boolean().optional(),
            })
          ).optional(),
          attributes: z.any().optional(),
          status: z.enum(["draft", "active", "inactive", "archived"]).optional(),
          approvalStatus: z.string().optional(),
          updatedById: z.string().optional(),
          approvedById: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const { id, data } = input;

      const product = await db.product.update({
        where: { id },
        data: {
          ...data,
          categoryPath: data.categoryPath ? { set: data.categoryPath } : undefined,
          tags: data.tags ? { set: data.tags } : undefined,
          searchTags: data.searchTags ? { set: data.searchTags } : undefined,
          keywords: data.keywords ? { set: data.keywords } : undefined,
          images: data.images ? { set: data.images } : undefined,
          videos: data.videos ? { set: data.videos } : undefined,
          documents: data.documents ? { set: data.documents } : undefined,
          certifications: data.certifications ? { set: data.certifications } : undefined,
          allergens: data.allergens ? { set: data.allergens } : undefined,
          channelSkus: data.channelSkus ? { set: data.channelSkus } : undefined,
        },
      });

      return product;
    }),

  // Delete product (soft delete)
  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const product = await db.product.update({
        where: { id: input },
        data: { isDeleted: true },
      });
      return product;
    }),

  // Search products
  search: publicProcedure
    .input(z.object({
      query: z.string().optional(),
      categoryId: z.string().optional(),
      status: z.enum(["draft", "active", "inactive", "archived"]).optional(),
      minPrice: z.number().optional(),
      maxPrice: z.number().optional(),
    }))
    .query(async ({ input }) => {
      const { query, categoryId, status, minPrice, maxPrice } = input;

      const products = await db.product.findMany({
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

      return products;
    }),
});