"use client"

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@knowingly/ui/button";
import { Checkbox } from "@knowingly/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub, DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@knowingly/ui/dropdown-menu";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { capitalizeFirstLetter, formatDate,} from "@knowingly/utils";
import { Icons } from "@knowingly/icons";
import { Avatar, AvatarImage } from "@knowingly/ui/avatar";
import { Ent, SupportCategory, SupportTicketStatus } from "@knowingly/backend/convex/types";
import { useConfirm } from "~/app/AlertDialogProvider";
import { useMutation } from "convex/react";
import { api } from "@knowingly/backend/convex/_generated/api";
import { toast } from "sonner";
import { Badge } from "@knowingly/ui/badge";
import { UpdateTicketSheet } from "./update-ticket-sheet";

export interface DataTableSupportTicket {
    id: string
    user: Ent<"users">
    title: string
    body: string
    category: SupportCategory
    status: SupportTicketStatus
    _creationTime: number
    }


export function getColumns(): ColumnDef<DataTableSupportTicket>[]{
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
      accessorKey: "user",
      header: () => (
        "User"
      ),
      cell: ({ row }) => {
        const user = row.original.user
        return (
          <div className="flex items-center gap-1" >

            <Avatar className=" rounded-sm size-6">
                    <AvatarImage
                      src={user.imageUrl}
                      alt={"logo"}
                      className="h-full w-full rounded-full"
                    />
                 
                </Avatar>
                {user.email}
          </div>
        )
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
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("title")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => {
        const category = row.original.category
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {capitalizeFirstLetter(category)}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.status
        switch (status) {
          case "OPEN":
            return (
              <div className="flex space-x-2">
                <Badge variant={"successful"} className="max-w-[31.25rem] truncate font-medium">
                  {capitalizeFirstLetter(status)}
                </Badge>
              </div>
            )
            break
          case "CLOSED":
            return (
              <div className="flex space-x-2">
                <Badge variant={"destructive"} className="max-w-[31.25rem] truncate font-medium">
                  {capitalizeFirstLetter(status)}
                </Badge>
              </div>
            )
            break
          case "PENDING":
            return (
              <div className="flex space-x-2">
                <Badge variant={"pending"} className="max-w-[31.25rem] truncate font-medium">
                  {capitalizeFirstLetter(status)}
                </Badge>
              </div>
            )
            break
        }
       
      },
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

        const deleteSupportTicket = useMutation(api.supportTickets._delete)
        const [open, setOpen] = React.useState(false)

        const confirm = useConfirm()
        return (
          <>
             <UpdateTicketSheet
              open={open}
              onOpenChange={setOpen}
              ticket={row.original}
            />
           
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <Icons.dots className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onSelect={() => setOpen(true)}>
                  Edit
                  <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                   onSelect={async () =>
                    await confirm({
                      title: "Are you sure you want to delete this ticket?",
                      body: "You can't undo this action.",
                      actionButton: "Yes",
                    }).then((proceed) => {
                      if (proceed) 
                        toast.promise(
                          deleteSupportTicket({id: row.original.id}),
                          {
                            loading: "Deleting...",
                            success: "Success: Deleted ticket",
                            error: (error) => `Error: ${error.data ?? "Something went wrong"}`,
                          }
                        )
                        
                    })
                  }
                >
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      },
    },
  ]
}
