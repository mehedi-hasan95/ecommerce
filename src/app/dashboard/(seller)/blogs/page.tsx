import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const WriteBlog = async () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-custom_gray">Your Blog</h2>
        <Link href="/dashboard/blogs/new">
          <Button>Create New</Button>
        </Link>
      </div>
      <Separator className="my-3" />
    </div>
  );
};

export default WriteBlog;
