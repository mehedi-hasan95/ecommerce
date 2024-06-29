import { Loader2, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const UpdateButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button disabled>
      {children}
      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
    </Button>
  );
};
