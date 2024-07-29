"use client"
"use memo"

import * as React from "react"
import { DataTableMember, getColumns } from "./columns"
import { useDataTable } from "~/lib/hooks/useDataTable"
import { DataTable } from "~/components/data-table/data-table"
import { DataTableAdvancedToolbar } from "~/components/data-table/advanced/data-table-advanced-toolbar"
import { DataTableToolbar } from "~/components/data-table/data-table-toolbar"
import { DataTableFilterField } from "~/components/data-table/types"
import { FunctionReturnType } from "convex/server"
import { api } from "@knowingly/backend/convex/_generated/api"
import { MembersTableToolbarActions } from "./toolbar-actions"
import { IconKey } from "@knowingly/icons"




export function MembersTable({ data }: { data: FunctionReturnType<typeof api.hubs.getMembers> }) {
  // Feature flags for showcasing some additional features. Feel free to remove them.


  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), [])


  const filterFields: DataTableFilterField<DataTableMember>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Filter names...",
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
  const tableData = data?.map((member) => ({
    id: member._id,
    name: member.user?.name || "-",
    role: {
      id: member.role?._id,
      name: member.role?.name || "-",
      icon: member.role?.icon as IconKey,
    },
    _creationTime: member._creationTime,
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
          <MembersTableToolbarActions table={table} />
        </DataTableToolbar>
    </DataTable>
  )
}
