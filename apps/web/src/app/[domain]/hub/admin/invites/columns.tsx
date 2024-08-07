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
import { Icon } from "@knowingly/icons"
import { capitalizeFirstLetter } from "@knowingly/utils"
import { useSubdomain } from "~/lib/hooks/useSubdomain"
import { useMutation, useQuery } from "convex/react"
import { api } from "@knowingly/backend/convex/_generated/api"
import type { Id } from "@knowingly/backend/convex/_generated/dataModel"
import { formatDate } from "@knowingly/utils"
import { Icons } from "@knowingly/icons";
import { RenderIcon } from "~/components/icon-picker/render-icon";
import { Ent } from "@knowingly/backend/convex/types";

export interface DataTableInvite {
    id: string
    email: string
    role: Ent<"roles">
    status: string
    _creationTime: number
    }


export function getColumns(): ColumnDef<DataTableInvite>[]{
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
    // {
    //   accessorKey: "code",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Task" />
    //   ),
    //   cell: ({ row }) => <div className="w-20">{row.getValue("code")}</div>,
    //   enableSorting: false,
    //   enableHiding: false,
    // },
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
      accessorKey: "roleId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role ID" />
      ),
      cell: ({ row }) => {

        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("roleId")}
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

        return (
          <div className="flex w-[6.25rem] items-center">
             <RenderIcon icon={role.icon} size={1} className="mr-2 text-muted-foreground" />
            <span className="capitalize">{capitalizeFirstLetter(role.name)}</span>
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
        const icon = status === "ACCEPTED" ? "circleCheck" : "hourglass"

        return (
          <div className="flex w-[6.25rem] items-center">
            <Icon 
             name={icon}
              className="mr-2 size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="capitalize">{capitalizeFirstLetter(status)}</span>
          </div>
        )
      },
    },

   
    {
      accessorKey: "_creationTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sent  At" />
      ),
      cell: ({ cell }) => formatDate(cell.getValue() as Date),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition()
        const [showDeleteTaskDialog, setShowDeleteTaskDialog] =
          React.useState(false)

        const subdomain = useSubdomain()

        const roles = useQuery(api.hubs.getRoles, { subdomain })
        const updateInvite = useMutation(api.hubInvites.update)
        if(row.original.status === "ACCEPTED") return null


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
                      value={row.original.role._id}
                      onValueChange={(value) => {
                        startUpdateTransition(() => {
                          toast.promise(
                             updateInvite({
                              id: row.original.id as Id<"hubInvites">,
                              field: "roleId",
                              value: value as Id<"roles">,
                            }),
                            {
                              loading: "Updating...",
                              success: "Invite updated",
                              // error: (err) => console.log(error) getErrorMessage(err),
                            }
                          )
                        })
                      }}
                    >
                      {roles?.map((role) => (
                        <DropdownMenuRadioItem
                          key={role._id}
                          value={role._id}
                          className="capitalize"
                          disabled={isUpdatePending}
                        >
                          {capitalizeFirstLetter(role.name)}
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
