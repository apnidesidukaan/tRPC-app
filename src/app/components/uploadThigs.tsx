"use client";

import { UploadButton } from "@uploadthing/react";
import type { UploadRouter } from "~/server/api/routers/upload";

export default function UploadThingsUploader() {
  return (
    <div className="p-4 border w-fit bg-accent rounded">
      <UploadButton<UploadRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files uploaded:", res);
          alert("Upload complete!");
        }}
        onUploadError={(err) => {
          alert(`ERROR! ${err.message}`);
        }}
      />
    </div>  
  );
}
