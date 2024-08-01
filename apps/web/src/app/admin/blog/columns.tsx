"use client";

import type { ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import Link from "next/link";

import { Icons } from "@knowingly/icons";
import { Badge } from "@knowingly/ui/badge";
import { Button } from "@knowingly/ui/button";
import { Checkbox } from "@knowingly/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@knowingly/ui/dropdown-menu";
import { formatDate } from "@knowingly/utils";

import { useConfirm } from "~/app/AlertDialogProvider";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { Ent } from "@knowingly/backend/convex/types";

export interface DataTableBlogpost {
  id: string;
  title: string;
  slug: string;
  author: Ent<"users">;
  isPublished: boolean;
  publishedAt: number | undefined;
  _creationTime: number;
}

export function getColumns(): ColumnDef<DataTableBlogpost>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("id")}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Link
              className="max-w-[31.25rem] truncate font-medium"
              href={`/blog/${row.getValue("id")}`}
            >
              {row.getValue("title")}
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "slug",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Slug" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Link
              className="max-w-[31.25rem] truncate font-medium"
              href={`/blog/${row.getValue("id")}`}
            >
              {"/" + row.original.slug}
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "author",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Author" />
      ),
      cell: ({ row }) => {
        const author = row.original.author;
        return (
          <div className="flex space-x-2">
            <img
              src={author.imageUrl}
              alt={author.name}
              width={20}
              height={20}
              className="h-5 w-5 rounded-full"
            />
            <span
              className="max-w-[31.25rem] truncate font-medium"
            >
              {author.name}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "isPublished",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const isPublished = row.getValue("isPublished");
        return (
          <div className="flex space-x-2">
            <Badge
              className="max-w-[31.25rem] truncate font-medium"
              variant={isPublished ? "successful" : "pending"}
            >
              {isPublished ? "Published" : "Draft"}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "publishedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Published At" />
      ),
      cell: ({ cell }) => {
        if (!cell.getValue()) return null;
        return formatDate(cell.getValue() as Date);
      }
    },
    {
      accessorKey: "_creationTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ cell }) => formatDate(cell.getValue() as Date),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition();
        const [showDeleteTaskDialog, setShowDeleteTaskDialog] =
          React.useState(false);

        const confirm = useConfirm();

        const remove = () => {
          console.log("remove");
        };

        return (
          <>
            {/* <UpdateInvite
              open={showUpdateTaskSheet}
              onOpenChange={setShowUpdateTaskSheet}
              task={row.original}
            /> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <Icons.dots className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Sub menu</DropdownMenuSubTrigger>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={async () =>
                    await confirm({
                      title: "Are you sure you want to delete this blog post?",
                      body: "You can't undo this action.",
                      actionButton: "Yes",
                    }).then((yes) => {
                      if (yes) remove();
                    })
                  }
                >
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
}
