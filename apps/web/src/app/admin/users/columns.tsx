"use client"

import * as React from "react"
import type {ColumnDef} from "@tanstack/react-table";
import { toast } from "sonner"

import { Button } from "@knowingly/ui/button"
import { Checkbox } from "@knowingly/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@knowingly/ui/dropdown-menu"
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header"
import type { IconKey } from "@knowingly/icons";
import { Icon } from "@knowingly/icons"
import { capitalizeFirstLetter } from "@knowingly/utils"
import { useSubdomain } from "~/lib/hooks/useSubdomain"
import { useMutation, useQuery } from "convex/react"
import { api } from "@knowingly/backend/convex/_generated/api"
import type { Id } from "@knowingly/backend/convex/_generated/dataModel"
import { formatDate } from "@knowingly/utils"
import { Icons } from "@knowingly/icons";

export interface DataTableUser {
    id: string
    name: string
    role: string
    _creationTime: number
    }


export function getColumns(): ColumnDef<DataTableUser>[]{
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
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => {
        

        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("email")}
            </span>
          </div>
        )
      },
      
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => {
        const role = row.original.role
        const icon = role === "SUPERUSER" ? "userStar" : "userSquareRounded"
        return (
          <div className="flex w-[6.25rem] items-center">
            <Icon 
             name={icon}
              className="mr-2 size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="capitalize">{capitalizeFirstLetter(role)}</span>

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
        
        const updateUser = useMutation(api.users.update)



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
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={row.original.role}
                      onValueChange={(value) => {
                        startUpdateTransition(() => {
                          toast.promise(
                             updateUser({
                              id: row.original.id as Id<"users">,
                              field: "role",
                              value: value,
                            }),
                            {
                              loading: "Updating...",
                              success: "User role updated",
                              // error: (err) => console.log(error) getErrorMessage(err),
                            }
                          )
                        })
                      }}
                    >
                      {["SUPERUSER", "USER"].map((role) => (
                        <DropdownMenuRadioItem
                          key={role}
                          value={role}
                          className="capitalize"
                          disabled={isUpdatePending}
                        >
                          {capitalizeFirstLetter(role)}
                        </DropdownMenuRadioItem>
                      ))}
                      
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                 
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
