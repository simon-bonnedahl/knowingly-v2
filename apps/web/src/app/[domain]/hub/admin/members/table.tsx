"use client";
"use memo";

import * as React from "react";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { FunctionReturnType } from "convex/server";

import { api } from "@knowingly/backend/convex/_generated/api";
import { IconKey } from "@knowingly/icons";

import { DataTable } from "~/components/data-table/data-table";
import { DataTableSkeleton } from "~/components/data-table/data-table-skeleton";
import { DataTableToolbar } from "~/components/data-table/data-table-toolbar";
import { DataTableFilterField } from "~/components/data-table/types";
import { useDataTable } from "~/lib/hooks/useDataTable";
import { DataTableMember, getColumns } from "./columns";
import { MembersTableToolbarActions } from "./toolbar-actions";

export function MembersTable({
  preloaded,
}: {
  preloaded: Preloaded<typeof api.hubs.getMembers>;
}) {
  // Feature flags for showcasing some additional features. Feel free to remove them.

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), []);

  const data = usePreloadedQuery(preloaded);

  const roles = React.useMemo(() => {
    const roles = data?.map((member) => member.role) || [];
    return Array.from(new Set(roles));
  }, [data]);

  const tableData = React.useMemo(
    () =>
      data?.map((member) => ({
        id: member._id,
        name: member.user?.name || "-",
        role: member.role,
        _creationTime: member._creationTime,
      })),
    [data],
  );

  const filterFields: DataTableFilterField<DataTableMember>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Filter names...",
    },
    {
      label: "Role",
      value: "role",
      options: roles.map((role) => ({
        label: role?.name,
        value: role,
        icon: role?.icon,
        withCount: true,
      })),
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

  const { table } = useDataTable({
    data: tableData || [],
    columns,
    pageCount: 1,
    // optional props
    filterFields,
  });
  if (!data) {
    return <DataTableSkeleton columnCount={5} />;
  }

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields}>
        <MembersTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
