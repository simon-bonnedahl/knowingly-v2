import { useParams } from "next/navigation";
import {  useQuery } from "convex/react";
import { fetchQuery } from "convex/nextjs";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { Metadata } from "next";
import { BlogLayout } from "~/components/blog-layout";



export async function generateMetadata({
    params,
  }: {
    params: { slug: string };
  }): Promise<Metadata | null> {
  
  
    const blogPost = await fetchQuery(api.blogPosts.getBySlug, { slug: params.slug });
    if (!blogPost) return null;
    return {
        title: blogPost.title,
        openGraph: {
          title: blogPost.title,
          images: [blogPost.banner],
        },
        icons: ["/logo-small-black.svg"],
    };
  }

export default async function BlogPostPage({
    params,
  }: {
    params: { slug: string };
  }) {

    const blogPost = await fetchQuery(api.blogPosts.getBySlug, { slug: params.slug });

    if (!blogPost) return null;
    return (
        <BlogLayout blogPost={blogPost}>
        </BlogLayout>
    );
    }