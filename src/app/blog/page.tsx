import { allBlogAction } from "@/actions/seller/blog-action";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const BlogPage = async () => {
  const data = await allBlogAction();
  return (
    <div className="max-w-screen-2xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {data.map((item) => (
        <Link href={`/blog/${item.id}`} key={item.id}>
          <Card className="w-full p-5 space-y-3">
            <Image
              src={item.image}
              alt={item.title}
              height={500}
              width={500}
              className="h-full w-full"
            />
            <CardTitle className="line-clamp-2 text-custom_gray py-2">
              {item.title}
            </CardTitle>
            <CardDescription className="line-clamp-3">
              {item.short_desc}
            </CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default BlogPage;
