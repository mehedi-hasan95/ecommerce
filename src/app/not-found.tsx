import { XCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-96 space-y-3 bg-gray-50">
      <div>
        <XCircle className="size-9 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold">
        What you are looking for is Not Found
      </h2>
      <p>Please try another way</p>
      <Link href="/" className="text-2xl font-bold text-custom_gray">
        Back to Homepage
      </Link>
    </div>
  );
}
