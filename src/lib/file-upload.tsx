"use client";

import { toast } from "sonner";
import { UploadDropzone } from "./uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  value?: string[];
  disabled?: boolean;
}

export const FileUpload = ({
  endpoint,
  onChange,
  value,
  disabled,
}: FileUploadProps) => {
  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {value?.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={url}
              sizes="100%"
            />
          </div>
        ))}
      </div>
      <UploadDropzone
        disabled={disabled}
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          toast.error(`${error?.message}`);
        }}
      />
    </>
  );
};
