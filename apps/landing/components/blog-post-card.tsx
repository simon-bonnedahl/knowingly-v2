import { Link } from "next-view-transitions";
import React from "react";
import { BlurImage } from "./blur-image";
import { Logo } from "./Logo";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { FunctionReturnType } from "convex/server";
import { api } from "@knowingly/backend/convex/_generated/api";

export const BlogPostCard = ({ blogPost }: { blogPost: FunctionReturnType<typeof api.blogPosts.getBySlug> }) => {
  if(!blogPost) {
    return null;
  }
  return (
    <Link
      className="shadow-derek rounded-3xl border dark:border-neutral-800 w-full bg-white dark:bg-neutral-900  overflow-hidden  hover:scale-[1.02] transition duration-200"
      href={`/blog/${blogPost.slug}`}
    >
        <BlurImage
          src={blogPost.banner}
          alt={blogPost.title}
          height="800"
          width="800"
          className="h-52 object-cover object-top w-full"
        />
      <div className="p-4 md:p-8 bg-white dark:bg-neutral-900">
        <div className="flex space-x-2 items-center  mb-2">
          <Image
            src={blogPost.author.imageUrl}
            alt={blogPost.author.name}
            width={20}
            height={20}
            className="rounded-full h-5 w-5"
          />
          <p className="text-sm font-normal text-muted">{blogPost.author.name}</p>
        </div>
        <p className="text-lg font-bold mb-4">
          <Balancer>{blogPost.title}</Balancer>
        </p>
        {/* <p className="text-left text-sm mt-2 text-muted">
          {truncate(blogPost.description, 100)}
        </p> */}
      </div>
    </Link>
  );
};
