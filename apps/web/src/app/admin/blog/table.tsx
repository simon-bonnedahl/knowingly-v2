"use client";
"use memo";

import type { Preloaded } from "convex/react";
import * as React from "react";
import { useMutation, usePreloadedQuery, useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Icons } from "@knowingly/icons";
import { Button } from "@knowingly/ui/button";

import type { DataTableFilterField } from "~/components/data-table/types";
import { DataTable } from "~/components/data-table/data-table";
import { DataTableToolbar } from "~/components/data-table/data-table-toolbar";
import { useDataTable } from "~/lib/hooks/useDataTable";
import { DataTableBlogpost, getColumns } from "./columns";
import { useRouter } from "next/navigation";
import { getBySlug } from "@knowingly/backend/convex/blogPosts";

export function BlogpostsTable({
  preloaded,
}: {
  preloaded: Preloaded<typeof api.blogPosts.list>;
}) {
  const router = useRouter();
  const [isCreating, setIsCreating] = React.useState(false);
  const columns = React.useMemo(() => getColumns(), []);

  const create = useMutation(api.blogPosts.create);

  const data = usePreloadedQuery(preloaded);

  const onCreate = async () => {
    setIsCreating(true);
    const blogPost = await create();
    router.push(`/blog/${blogPost._id}`);
  };

  const filterFields: DataTableFilterField<DataTableBlogpost>[] = [
    {
      label: "Title",
      value: "title",
      placeholder: "Filter titles...",
    },

    // {
    //   label: "Priority",
    //   value: "priority",
    //   options: tasks.priority.enumValues.map((priority) => ({
    //     label: priority[0]?.toUpperCase() + priority.slice(1),
    //     value: priority,
    //     icon: getPriorityIcon(priority),
    //     withCount: true,
    //   })),
    // },
  ];

  const tableData = React.useMemo(
    () =>
      data.map((blogPost) => ({
        id: blogPost._id,
        title: blogPost.title,
        slug: blogPost.slug,
        author: blogPost.author,
        isPublished: blogPost.isPublished,
        publishedAt: blogPost.publishedAt,
        _creationTime: blogPost._creationTime,
      })),
    [data],
  );

  const { table } = useDataTable({
    data: tableData,
    columns,
    pageCount: 1,
    filterFields,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields}>
        <Button
          variant={"ringHover"}
          size="sm"
          onClick={onCreate}
          disabled={isCreating}
        >
          {isCreating ? (
            <>
              <Icons.loader className="size-4 mr-2 animate-spin" />
              Creating
            </>
          ) : (
            <>
              <Icons.plus className="mr-2 size-4" />
              Create new
            </>
          )}
        </Button>
      </DataTableToolbar>
    </DataTable>
  );
}
