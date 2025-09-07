import { createNextRouteHandler } from "uploadthing/next";
import { uploadRouter } from "~/server/api/routers/upload";

// Export handlers to handle upload requests
export const { GET, POST } = createNextRouteHandler({
  router: uploadRouter,
});
