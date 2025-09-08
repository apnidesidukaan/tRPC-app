import { createUploadthing, type FileRouter } from "@uploadthing/server";
import { z } from "zod";

// Initialize UploadThing
const f = createUploadthing();

// Define your file upload routes
export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
  .middleware(async ({ req }) => {
    // Authentication middleware
    const user = await auth(req);
    if (!user) throw new UploadThingError("Unauthorized");
    return { userId: user.id };
  })
  .onUploadComplete(async ({ file, metadata }) => {
    // Handle post-upload logic
    console.log("File uploaded:", file.url);
    return { fileUrl: file.url };
  }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
export const uploadthing = f;
