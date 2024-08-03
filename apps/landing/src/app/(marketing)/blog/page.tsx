import { type Metadata } from "next";
import { Background } from "~/components/background";
import { Container } from "~/components/container";
import { Heading } from "~/components/heading";
import { Subheading } from "~/components/subheading";
import { fetchQuery } from "convex/nextjs";
import { api } from "@knowingly/backend/convex/_generated/api";
import { BlogPostCard } from "~/components/blog-post-card";

export const metadata: Metadata = {
  title: "Blogs - Knowingly",
  description:
    "Knowingly is a platform that provides...",
  openGraph: {
    images: [],
  },
};

export default async function BlogsIndex() {
  const blogPosts = await fetchQuery(api.blogPosts.list);

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
          {blogPosts.slice(0, 2).map((blogPost) => (
            <BlogPostCard blogPost={blogPost} key={blogPost._id} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full relative z-20">
          {blogPosts.slice(2).map((blogPost) => (
            <BlogPostCard blogPost={blogPost} key={blogPost._id} />
          ))}
        </div>
      </Container>
    </div>
  );
}
