"use client";
"use memo";

import type { Preloaded } from "convex/react";
import * as React from "react";
import { usePreloadedQuery, useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";

import type {  DataTableUser } from "./columns";
import type { DataTableFilterField } from "~/components/data-table/types";
import { DataTable } from "~/components/data-table/data-table";
import { DataTableToolbar } from "~/components/data-table/data-table-toolbar";
import { useDataTable } from "~/lib/hooks/useDataTable";
import { getColumns } from "./columns";

export function UsersTable({
  preloaded,
}: {
  preloaded: Preloaded<typeof api.users.list>;
}) {
  const columns = React.useMemo(() => getColumns(), []);

  const data = usePreloadedQuery(preloaded);

  const filterFields: DataTableFilterField<DataTableUser>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Filter names...",
    },
    
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
  ];

  const tableData = React.useMemo(
    () =>
      data.map((user) => ({
        id: user._id,
        name: user.name,
        role : user.role,
        email: user.email,
        _creationTime: user._creationTime,
      })),
    [data],
  );

  const { table } = useDataTable({
    data: tableData,
    columns,
    pageCount: 1,
    filterFields,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar
        table={table}
        filterFields={filterFields}
      ></DataTableToolbar>
    </DataTable>
  );
}
