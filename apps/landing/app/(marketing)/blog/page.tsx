import { type Metadata } from "next";
import { getAllBlogs } from "@/lib/blog";
import { Background } from "@knowingly/background";
import { Container } from "@knowingly/container";
import { Heading } from "@knowingly/heading";
import { Subheading } from "@knowingly/subheading";
import { BlogCard } from "@knowingly/blog-card";

export const metadata: Metadata = {
  title: "Blogs - Knowingly",
  description:
    "Knowingly is a platform that provides...",
  openGraph: {
    images: [],
  },
};

export default async function BlogsIndex() {
  let blogs = await getAllBlogs();

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <Heading as="h1">Blog</Heading>
          <Subheading className="text-center">
            Discover insightful resources and expert advice from our seasoned
            team to elevate your knowledge.
          </Subheading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-20 w-full mb-10">
          {blogs.slice(0, 2).map((blog, index) => (
            <BlogCard blog={blog} key={blog.title + index} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full relative z-20">
          {blogs.slice(2).map((blog, index) => (
            <BlogCard blog={blog} key={blog.title + index} />
          ))}
        </div>
      </Container>
    </div>
  );
}
