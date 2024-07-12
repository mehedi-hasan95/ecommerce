import { allBlogAction } from "@/actions/seller/blog-action";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import Link from "next/link";
import { BlogClient } from "./_components/blog-client";

const WriteBlog = async () => {
  const blogs = await allBlogAction();
  const modifyData = blogs.map((item) => ({
    id: item.id,
    title: item.title,
    img: item.image,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-custom_gray">Your Blog</h2>
        <Link href="/dashboard/blogs/new">
          <Button>Create New</Button>
        </Link>
      </div>
      <Separator className="my-3" />
      <BlogClient data={modifyData} />
    </div>
  );
};

export default WriteBlog;
