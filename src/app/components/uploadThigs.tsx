// /src/components/FileUploader.tsx
"use client";

import { UploadButton } from "@uploadthing/react";
import type { UploadRouter } from "~/server/api/uploadthing";

export default function FileUploader() {
  return (
    <UploadButton<UploadRouter>
      endpoint="imageUploader"  
      onClientUploadComplete={(res) => {
        console.log("Upload complete:", res);
        alert("File uploaded successfully!");
      }}
      onUploadError={(err) => {
        console.error("Upload failed:", err);
      }}
    />
  );
}
