import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "~/server/db";

export const userRouter = createTRPCRouter({
  // 1. Register User
  register: publicProcedure
    .input(z.object({
      name: z.string(),
      mobile: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      gender: z.enum(["male", "female", "other"]),
      dob: z.string().optional(),
      agreementCheck: z.boolean(),
      referralCode: z.string().optional(),
      roleId: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.user.findUnique({
        where: { email: input.email }
      });
      if (existing) throw new Error("User already exists");

      const hash = await bcrypt.hash(input.password, 10);

      const user = await ctx.db.user.create({
        data: {
          name: input.name,
          mobile: input.mobile,
          email: input.email,
          passwordHash: hash,
          gender: input.gender,
          dob: input.dob ? new Date(input.dob) : undefined,
          agreementCheck: input.agreementCheck,
          referralCode: input.referralCode,
          roleId: input.roleId,
        },
      });

      return user;
    }),

  // 2. Login
  login: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {

      const user = await db.user.findUnique({
        where: { mobile: input }
      });
      if (!user) throw new Error("Invalid credentials");

      // const valid = await bcrypt.compare(input.password, user.passwordHash);
      // if (!valid) throw new Error("Invalid credentials");

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
      return {
        token,
        user,
        message: "Login ho gaya hai !",
      };
    }),

  // 3. Get Profile
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: { address: true, bankAccountDetails: true, role: true, business: true }
    });
  }),

  // 4. Update Profile
  updateProfile: protectedProcedure
    .input(z.object({
      name: z.string().optional(),
      gender: z.enum(["male", "female", "other"]).optional(),
      dob: z.string().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          name: input.name,
          gender: input.gender,
          dob: input.dob ? new Date(input.dob) : undefined,
          isActive: input.isActive,
        },
      });
    }),

  // 5. Manage Addresses
  addAddress: protectedProcedure
    .input(z.object({
      label: z.string().default("Home"),
      street: z.string().optional(),
      landmark: z.string().optional(),
      area: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      zipCode: z.string().optional(),
      geoLat: z.number().optional(),
      geoLng: z.number().optional(),
      contactName: z.string().optional(),
      contactPhone: z.string().optional(),
      isDefault: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.address.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        }
      });
    }),
});
