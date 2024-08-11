"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { Icons } from "@knowingly/icons";
import { Badge } from "@knowingly/ui/badge";
import { Button, buttonVariants } from "@knowingly/ui/button";
import { formatDate } from "@knowingly/utils";

import Editor from "~/components/editor/editor";
import { FileUploadModal } from "~/components/file-uploader/modal";
import { useDebounce } from "~/lib/hooks/useDebounce";
import { Banner } from "@knowingly/backend/convex/types";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@knowingly/ui";

export default function AdminBlogpostPage() {
  const { id } = useParams();
  const blogPost = useQuery(api.blogPosts.get, { id: id as Id<"blogPosts"> });
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [banner, setBanner] = useState<Banner | undefined>();
  const [fileUploaderOpen, setFileUploaderOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const debouncedContent = useDebounce(content, 1000);
  const debouncedTitle = useDebounce(title, 1000);

  const updateBlogpost = useMutation(api.blogPosts.update);

  const onChangeBanner = (upload: string) => {
    setBanner({ type: "URL", value: upload });
  }

  const onChange = async (content: any) => {
    setIsSaving(true);
    setContent(content);
  };

  useEffect(() => {
    if (!blogPost) return;
    setTitle(blogPost.title);
    setContent(blogPost.content);
    setBanner(blogPost.banner);
  }, [blogPost]);

  useEffect(() => {
    if (!debouncedContent || !blogPost || debouncedContent === blogPost.content)
      return;
    void updateBlogpost({
      id: blogPost._id,
      field: "content",
      value: JSON.stringify(debouncedContent),
    });
    setIsSaving(false);
  }, [debouncedContent]);

  useEffect(() => {
    if (!debouncedTitle || !blogPost || debouncedTitle === blogPost.title)
      return;
    void updateBlogpost({
      id: blogPost._id,
      field: "title",
      value: debouncedTitle,
    });
    setIsSaving(false);
  }, [debouncedTitle]);

  useEffect(() => {
    if (!banner || !blogPost || banner === blogPost.banner) return;
    toast.promise(
      updateBlogpost({
        id: blogPost._id,
        field: "banner",
        value: banner,
      }),
      {
        loading: "Updating banner",
        success: "Success: Updated banner",
        error: (error) => `Error: ${error.data ?? "Something went wrong"}`,
      },
    );
  }
    , [banner]);

  if (!blogPost) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between p-4">
      <Link href="/blog" className={cn(buttonVariants({
        variant: "ringHover",
        className: "absolute top-2 left-2 z-30 h-10 w-10 rounded-full p-1",
      }))}>
        <Icons.arrowLeft className="size-5" />
      </Link>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 ">
            <Image
              src={blogPost.author.imageUrl}
              alt={blogPost.author.name}
              width={20}
              height={20}
              className="size-6 rounded-full"
            />
            <p className=" text-sm font-medium text-foreground">
              {blogPost.author.name}
            </p>
          </div>
          <div className="h-5 w-0.5 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
          {blogPost.isPublished ? (
            <span className="text-sm text-foreground">
              {formatDate(blogPost.publishedAt )}
            </span>
          ) : (
            <Badge variant={"pending"}>Draft</Badge>
          )}
          <div className="h-5 w-0.5 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
          {isSaving ? (
            <Icons.loader className="size-4 animate-spin" />
          ) : (
            <Icons.check className="size-4 text-green-500" />
          )}
        </div>
      </div>
      <div className="group relative  max-w-4xl px-4 mx-auto">
        <Image
          src={blogPost.banner.value}
          height="800"
          width="800"
          className="aspect-square h-64 w-full rounded-3xl object-cover md:h-96"
          alt={blogPost.title}
        />
        <FileUploadModal
          open={fileUploaderOpen}
          setOpen={setFileUploaderOpen}
          setUpload={onChangeBanner}
          recommendedAspect={16/9}
        />
        <Button
          variant={"ringHover"}
          className="absolute bottom-4 right-8 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          size="sm"
          onClick={() => setFileUploaderOpen(true)}
        >
          <Icons.pencil className="mr-1 size-4" />
          Edit
        </Button>
      </div>
      <div className="xl:relative ">
        <div className=" max-w-4xl px-4 mx-auto">
          <div className="pb-8 ">
            <div className="flex flex-col ">
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setIsSaving(true);
                  setTitle(e.currentTarget.value);
                }}
                className="mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl bg-transparent"
              />
            </div>
            <div
              className="prose prose-sm dark:prose-invert mt-8"
              data-mdx-content
            >
              {blogPost.content && (
                <Editor
                  onChange={onChange}
                  initialContent={blogPost.content}
                  editable={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
