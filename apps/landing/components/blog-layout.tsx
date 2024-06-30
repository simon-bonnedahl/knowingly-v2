"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlogWithSlug } from "@/lib/blog";
import { IconArrowLeft } from "@tabler/icons-react";
import { format } from "date-fns";

import { Container } from "./container";
import { Logo } from "./Logo";

export function BlogLayout({
  blog,
  children,
}: {
  blog: BlogWithSlug;
  children: React.ReactNode;
}) {
  return (
    <Container className="mt-16 lg:mt-32">
      <div className="flex items-center justify-between px-2 py-8">
        <Link href="/blog" className="flex items-center space-x-2">
          <IconArrowLeft className="dark:text-muted-dark h-4 w-4 text-muted" />
          <span className="dark:text-muted-dark text-sm text-muted">Back</span>
        </Link>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 ">
            <Image
              src={blog.author.src}
              alt={blog.author.name}
              width={20}
              height={20}
              className="h-5 w-5 rounded-full"
            />
            <p className="dark:text-muted-dark text-sm font-normal text-muted">
              {blog.author.name}
            </p>
          </div>
          <div className="h-5 w-0.5 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
          <time dateTime={blog.date} className="flex items-center text-base ">
            <span className="dark:text-muted-dark text-sm text-muted">
              {format(new Date(blog.date), "MMMM dd, yyyy")}
            </span>
          </time>
        </div>
      </div>
      <div className="mx-auto max-w-4xl">
        {blog.image ? (
          <Image
            src={blog.image}
            height="800"
            width="800"
            className="aspect-square h-40 w-full rounded-3xl object-cover md:h-96"
            alt={blog.title}
          />
        ) : (
          <div className="aspect-squace shadow-derek flex h-40 w-full items-center justify-center rounded-3xl dark:bg-neutral-900 md:h-96">
            <Logo />
          </div>
        )}
      </div>
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <article className="pb-8">
            <header className="flex flex-col">
              <h1 className="mt-8 text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 sm:text-5xl ">
                {blog.title}
              </h1>
            </header>
            <div
              className="prose prose-sm dark:prose-invert mt-8"
              data-mdx-content
            >
              {children}
            </div>
          </article>
        </div>
      </div>
    </Container>
  );
}
