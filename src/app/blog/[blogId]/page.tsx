import { allBlogAction, singleBlogAction } from "@/actions/seller/blog-action";
import { ItemNotFound } from "@/components/common/error/item-not-found";
import { Preview } from "@/components/custom/preview";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Metadata } from "next";

export async function generateStaticParams() {
  const posts = await allBlogAction();

  return posts.map((post) => ({
    blogId: post.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}): Promise<Metadata> {
  const data = await singleBlogAction(params.blogId);

  return {
    title: data?.title,
    description: data?.short_desc,
    generator: "Next.js",
    applicationName: "Next.js",
    referrer: "origin-when-cross-origin",
    keywords: data?.tags,
    authors: [{ name: "Mehedi Hasan", url: "https://mehedi95.vercel.app/" }],
    creator: "Mehedi Hasan",
    publisher: "Mehedi Hasan",
  };
}
const BlogId = async ({ params }: { params: { blogId: string } }) => {
  const data = await singleBlogAction(params.blogId);
  if (!data) return <ItemNotFound title="Blog" />;
  return (
    <div className="max-w-screen-2xl mx-auto px-6 pb-10">
      <Image
        src={data?.image}
        alt={data?.title}
        layout="responsive"
        height={500}
        width={500}
        className="w-full h-auto"
      />
      <h2 className="text-2xl font-bold text-custom_gray py-5">{data.title}</h2>
      <Preview value={data.desc} />
      <h2 className="text-lg font-semibold flex gap-4 pt-10">
        Tags:{" "}
        <div className="flex flex-wrap gap-4">
          {data.tags.map((item, idx) => (
            <Button key={idx}>{item}</Button>
          ))}
        </div>
      </h2>
    </div>
  );
};

export default BlogId;
