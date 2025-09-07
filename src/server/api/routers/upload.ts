import { createUploadthing, type FileRouter } from "uploadthing/next";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const f = createUploadthing();

// define file rules
export const uploadRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }) // allow only images
    .middleware(async ({ ctx, req }) => {
      // ✅ protect upload with your tRPC auth/session
      if (!ctx.session?.user) throw new Error("Unauthorized");
      return { userId: ctx.session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // called after upload
      console.log("Upload complete:", file.url);
      // save to DB if you want
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

// register into your main router
export const appRouter = createTRPCRouter({
  upload: uploadRouter as any,
  // ...other routers
});
