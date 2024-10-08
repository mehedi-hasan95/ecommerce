import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        className="w-full md:w-[350px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search for products"
      />
    </div>
  );
};
