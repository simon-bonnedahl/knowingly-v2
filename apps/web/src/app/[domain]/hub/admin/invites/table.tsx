"use client"
"use memo"

import * as React from "react"
import {  DataTableInvite, getColumns } from "./columns"
import { useDataTable } from "~/lib/hooks/useDataTable"
import { DataTable } from "~/components/data-table/data-table"
import { DataTableToolbar } from "~/components/data-table/data-table-toolbar"
import { DataTableFilterField } from "~/components/data-table/types"
import { FunctionReturnType } from "convex/server"
import { api } from "@knowingly/backend/convex/_generated/api"
import { InvitesTableToolbarActions } from "./toolbar-actions"
import { IconKey } from "@knowingly/icons"




export function InvitesTable({ data }: { data: FunctionReturnType<typeof api.hubs.getInvites> }) {
  // Feature flags for showcasing some additional features. Feel free to remove them.


  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), [])


  const filterFields: DataTableFilterField<DataTableInvite>[] = [
    {
      label: "Email",
      value: "email",
      placeholder: "Filter emails...",
    },
    // {
    //   label: "Status",
    //   value: "status",
    //   options: tasks.status.enumValues.map((status) => ({
    //     label: status[0]?.toUpperCase() + status.slice(1),
    //     value: status,
    //     icon: getStatusIcon(status),
    //     withCount: true,
    //   })),
    // },
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
  ]
  const tableData = data?.map((invite) => ({
    id: invite._id,
    email: invite.email,
    role: {
      id: invite.role?._id,
      name: invite.role?.name || "-",
      icon: invite.role?.icon as IconKey,
    },
    status: invite.status,
    _creationTime: invite._creationTime,
  }))

  const { table } = useDataTable({
    data: tableData || [],
    columns,
    pageCount: 1,
    // optional props
    filterFields,
    defaultPerPage: 10,
    defaultSort: "_creationTime.desc",
  })

  return (
    <DataTable
      table={table}
     
    >
      
        <DataTableToolbar table={table} filterFields={filterFields} >
          <InvitesTableToolbarActions table={table} />
        </DataTableToolbar>
    </DataTable>
  )
}
