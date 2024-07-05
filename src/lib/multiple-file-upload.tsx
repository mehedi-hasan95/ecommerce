"use client";

import { toast } from "sonner";
import { UploadDropzone } from "./uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface MultipleFileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  value?: string[];
  disabled?: boolean;
  onRemove: (value: string) => void;
}

export const MultipleFileUpload = ({
  endpoint,
  onChange,
  value,
  disabled,
  onRemove,
}: MultipleFileUploadProps) => {
  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {value?.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              fill
              className="object-cover"
              alt="Image"
              sizes="100%"
            />
          </div>
        ))}
      </div>
      <UploadDropzone
        disabled={disabled}
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          console.log(res);
          onChange(res as any);
        }}
        onUploadError={(error: Error) => {
          toast.error(`${error?.message}`);
        }}
      />
    </>
  );
};
