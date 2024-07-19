"use client"

import { Button } from "@knowingly/ui/button"
import type { Table } from "@tanstack/react-table"
import { exportTableToCSV } from "~/components/data-table/export"
import { Icons } from "~/components/icons"
import { DataTableInvite } from "./columns"
import { InviteMemberModal } from "~/components/modals/invite-member-modal"



interface InvitesTableToolbarActionsProps {
  table: Table<DataTableInvite>
}

export function InvitesTableToolbarActions({
  table,
}: InvitesTableToolbarActionsProps) {
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
      <InviteMemberModal />
      <Button
        variant="ringHover"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "invites",
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
  )
}
