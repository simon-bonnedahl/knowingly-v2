"use client"

import { Button } from "@knowingly/ui/button"
import type { Table } from "@tanstack/react-table"
import { exportTableToCSV } from "~/components/data-table/export"
import { DataTableMember } from "./columns"
import { InviteMemberModal } from "~/components/modals/invite-member-modal"
import { Icons } from "@knowingly/icons"



interface MembersTableToolbarActionsProps {
  table: Table<DataTableMember>
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
      <InviteMemberModal />
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
  )
}
