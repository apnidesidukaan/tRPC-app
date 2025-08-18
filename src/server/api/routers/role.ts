import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const roleRouter = {
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        permissions: z.array(z.string()).min(1, "At least one permission is required"),
        createdBy: z.string().optional(), // defaults to "system" if not provided
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if role already exists
      const existing = await db.role.findUnique({
        where: { name: input.name },
      });

      if (existing) {
        throw new Error("Role with this name already exists");
      }

      // Create new role
      const role = await db.role.create({
        data: {
          name: input.name,
          permissions: input.permissions,
          createdBy: input.createdBy ?? "system",
        },
      });

      return role;
    }),


  getByName: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {

      const role = await db.role.findUnique({
        where: { name: input },
      });
      return role;
    }),



};
