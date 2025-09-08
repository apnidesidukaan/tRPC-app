// /src/app/api/uploadthing/route.ts
import { createUploadthing } from "@uploadthing/server";
import { uploadRouter } from "~/server/api/uploadthing";

const f = createUploadthing();

export const handler = f.createHandler({
  router: uploadRouter,
  createContext: () => ({}),
});

export { handler as GET, handler as POST };
