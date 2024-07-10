import { XCircle } from "lucide-react";

interface Props {
  title?: string;
  headding?: string;
}
export const ItemNotFound = ({ title, headding }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-72 space-y-3 bg-gray-50">
      <XCircle className="size-9 text-red-600" />
      <h2 className="text-2xl font-bold">
        {headding ? headding : <>{title} Not Found</>}{" "}
      </h2>
      <p>Please try another way</p>
    </div>
  );
};
