import { singleBlogAction } from "@/actions/seller/blog-action";
import { WriteBlogForm } from "./_components/write-blog-form";

const WriteBlogId = async ({ params }: { params: { blogId: string } }) => {
  const data = await singleBlogAction(params.blogId);
  return (
    <div>
      <WriteBlogForm initialData={data} />
    </div>
  );
};

export default WriteBlogId;
