import { XCircle } from "lucide-react";

export const ProductNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-72 space-y-3 bg-gray-50">
      <XCircle className="size-9 text-red-600" />
      <h2 className="text-2xl font-bold">Not Found</h2>
      <p>Please search another way</p>
    </div>
  );
};
