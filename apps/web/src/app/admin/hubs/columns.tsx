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
import { capitalizeFirstLetter, formatDate, isFile, isUrl } from "@knowingly/utils";
import { Icons } from "@knowingly/icons";
import { Avatar, AvatarImage } from "@knowingly/ui/avatar";
import Link from "next/link";
import { env } from "~/env";

export interface DataTableHub {
    id: string
    logo:string
    name: string
    subdomain: string
    tier: string
    _creationTime: number
    }


export function getColumns(): ColumnDef<DataTableHub>[]{
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
      accessorKey: "logo",
      header: ({ column }) => (
        null
      ),
      cell: ({ row }) => {
        const logo = row.original.logo
        return (
            <Avatar className=" rounded-sm size-6">
                  {(isUrl(logo) || isFile(logo)) ? (
                    <AvatarImage
                      src={logo}
                      alt={"logo"}
                      className="h-full w-full rounded-full"
                    />
                  ) : (
                    <div className="h-full w-full  bg-transparent">
                      <p className="text-xl">{logo}</p>
                    </div>
                  )}
                </Avatar>
        )
      },
      
    },
  
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        

        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("name")}
            </span>
          </div>
        )
      },
      
    },
    {
      accessorKey: "subdomain",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Domain" />
      ),
      cell: ({ row }) => {

        const path = `${row.original.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`
        

        return (
          <div className="flex space-x-2">
            <Link className="max-w-[31.25rem] truncate font-medium" href={`${env.NEXT_PUBLIC_PROTOCOL}://${path}`}>
              {path}
            </Link>
          </div>
        )
      },
    },
    {
      accessorKey: "tier",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tier" />
      ),
      cell: ({ row }) => {
        

        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {capitalizeFirstLetter(row.getValue("tier"))}
            </span>
          </div>
        )
      },
    },

   
    // {
    //   accessorKey: "status",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Status" />
    //   ),
    //   cell: ({ row }) => {
    //     const status = tasks.status.enumValues.find(
    //       (status) => status === row.original.status
    //     )

    //     if (!status) return null

    //     const Icon = getStatusIcon(status)

    //     return (
    //       <div className="flex w-[6.25rem] items-center">
    //         <Icon
    //           className="mr-2 size-4 text-muted-foreground"
    //           aria-hidden="true"
    //         />
    //         <span className="capitalize">{status}</span>
    //       </div>
    //     )
    //   },
    //   filterFn: (row, id, value) => {
    //     return Array.isArray(value) && value.includes(row.getValue(id))
    //   },
    // },
    
   
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
        const [isUpdatePending, startUpdateTransition] = React.useTransition()
        const [showDeleteTaskDialog, setShowDeleteTaskDialog] =
          React.useState(false)



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
                  <Icons.dots className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Edit role</DropdownMenuSubTrigger>
                 
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteTaskDialog(true)}
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
