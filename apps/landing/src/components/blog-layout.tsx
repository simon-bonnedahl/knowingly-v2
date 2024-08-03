"use client";

import Image from "next/image";
import Link from "next/link";

import { Container } from "./container";
import { FunctionReturnType } from "convex/server";
import { api } from "@knowingly/backend/convex/_generated/api";
import { formatDate } from "@knowingly/utils";
import Editor from "./editor/editor";
import { Icons} from "@knowingly/icons"

export function BlogLayout({
  blogPost,
}: {
  blogPost: FunctionReturnType<typeof api.blogPosts.getBySlug>;
}) {
  if (!blogPost) {
    return null;
  }
  return (
    <Container className="mt-16 lg:mt-16">
      <div className="flex items-center justify-between px-2 py-8">
        <Link href="/blog" className="flex items-center space-x-2">
          <Icons.arrowLeft className="dark:text-muted-dark h-4 w-4 text-muted" />
          <span className="dark:text-muted-dark text-sm text-muted">Back</span>
        </Link>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 ">
            <Image
              src={blogPost.author.imageUrl}
              alt={blogPost.author.name}
              width={20}
              height={20}
              className="h-5 w-5 rounded-full"
            />
            <p className="dark:text-muted-dark text-sm font-normal text-muted">
              {blogPost.author.name}
            </p>
          </div>
          <div className="h-5 w-0.5 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
          {blogPost.isPublished ? (
            <span className="text-sm text-foreground">
              {formatDate(blogPost.publishedAt!)}
            </span>
          ) : (
            <span className="text-sm text-muted">Draft</span>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-4xl">
          <Image
            src={blogPost.banner}
            height="800"
            width="800"
            className="aspect-square h-64 md:h-96 w-full rounded-3xl object-cover "
            alt={blogPost.title}
          />
      </div>
      <div className="xl:relative">
        <div className="mx-auto max-w-4xl">
          <article className="pb-8">
            <header className="flex flex-col">
              <h1 className="mt-8 text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 sm:text-5xl ">
                {blogPost.title}
              </h1>
            </header>
            <div className="mt-4">

              <Editor initialContent={blogPost.content} editable={false}  />
            </div>

          </article>
        </div>
      </div>
    </Container>
  );
}
