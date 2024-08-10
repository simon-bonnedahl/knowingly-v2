"use client";

import type { Table } from "@tanstack/react-table";

import { Icons } from "@knowingly/icons";
import { cn } from "@knowingly/ui";
import { Button, buttonVariants } from "@knowingly/ui/button";

import { exportTableToCSV } from "~/components/data-table/export";
import { InviteMemberModal } from "~/components/modals/invite-member-modal";
import { DataTableMember } from "./columns";

interface MembersTableToolbarActionsProps {
  table: Table<DataTableMember>;
}

export function MembersTableToolbarActions({
  table,
}: MembersTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {/* {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteTasksDialog
          tasks={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null} */}
      <InviteMemberModal>
        <div
          className={cn(
            buttonVariants({ variant: "ringHover", size: "sm" }),
            "hover:cursor-pointer",
          )}
        >
          <Icons.usersPlus className="mr-2 size-4" aria-hidden="true" />
          Invite member
        </div>
      </InviteMemberModal>
      <Button
        variant="ringHover"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "members",
            excludeColumns: ["select", "actions"],
          })
        }
      >
        <Icons.download className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button>
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
