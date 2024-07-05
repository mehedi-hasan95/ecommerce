import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  isActive: boolean;
  href: string;
  label: string;
}
export const ModifyLink = ({ isActive, href, label }: Props) => {
  return (
    <Link
      href={href}
      className={cn(
        "transition-all font-[500] flex items-center hover:text-green-700",
        isActive &&
          "text-green-700 hover:text-green-700 border-b-2 border-green-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-2">{label}</div>
    </Link>
  );
};
