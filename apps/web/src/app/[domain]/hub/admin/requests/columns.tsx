"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Ent } from "@knowingly/backend/convex/types";
import { Icons } from "@knowingly/icons";
import { Button } from "@knowingly/ui/button";
import { Checkbox } from "@knowingly/ui/checkbox";
import { capitalizeFirstLetter, formatDate } from "@knowingly/utils";

import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { RenderIcon } from "~/components/icon-picker/render-icon";
import { InviteMemberModal } from "~/components/modals/invite-member-modal";

export interface DataTableInvite {
  id: string;
  email: string;
  role: Ent<"roles">;
  _creationTime: number;
}

export function getColumns(): ColumnDef<DataTableInvite>[] {
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
        );
      },
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => {
        const role = row.original.role;

        return (
          <div className="flex w-[6.25rem] items-center">
            <RenderIcon
              icon={role.icon}
              size={1}
              className="mr-2 text-muted-foreground"
            />
            <span className="capitalize">
              {capitalizeFirstLetter(role.name)}
            </span>
          </div>
        );
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
        const email = row.original.email;
        const roleId = row.original.role._id;

        return (
          <div className="flex gap-1">
            <InviteMemberModal initialData={{ email, roleId }}>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <Icons.arrowUpRight className="size-4" aria-hidden="true" />
              </Button>
            </InviteMemberModal>
            <Button
              aria-label="Open menu"
              variant="ghost"
              className="flex size-8 p-0 data-[state=open]:bg-muted"
            >
              <Icons.trash className="size-4 text-red-500" aria-hidden="true" />
            </Button>
          </div>
        );
      },
    },
  ];
}
