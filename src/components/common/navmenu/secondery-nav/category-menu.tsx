import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AlignLeft, ChevronDown } from "lucide-react";

export const CategoryMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className="bg-green-600 flex gap-x-8 items-center px-5 py-2 rounded-full">
        <AlignLeft className="size-4 text-white" />
        <h5 className="text-white">All Category</h5>
        <ChevronDown className="size-4 text-white" />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
