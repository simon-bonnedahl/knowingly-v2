"use client";
"use memo";

import type { Preloaded } from "convex/react";
import * as React from "react";
import { usePreloadedQuery, useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";

import type { DataTableHub } from "./columns";
import type { DataTableFilterField } from "~/components/data-table/types";
import { DataTable } from "~/components/data-table/data-table";
import { DataTableToolbar } from "~/components/data-table/data-table-toolbar";
import { useDataTable } from "~/lib/hooks/useDataTable";
import { getColumns } from "./columns";

export function HubsTable({
  preloaded,
}: {
  preloaded: Preloaded<typeof api.hubs.list>;
}) {
  const columns = React.useMemo(() => getColumns(), []);

  const data = usePreloadedQuery(preloaded);

  const filterFields: DataTableFilterField<DataTableHub>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Filter names...",
    },
    {
      label: "Subdomain",
      value: "subdomain",
      placeholder: "Filter subdomains...",
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
      data.map((hub) => ({
        id: hub._id,
        logo: hub.logo,
        name: hub.name,
        subdomain: hub.subdomain,
        tier: hub.tier,
        _creationTime: hub._creationTime,
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
