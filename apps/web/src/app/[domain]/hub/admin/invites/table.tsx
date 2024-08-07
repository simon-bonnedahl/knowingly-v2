"use client";
"use memo";

import type { Preloaded } from "convex/react";
import * as React from "react";
import { usePreloadedQuery } from "convex/react";

import type { api } from "@knowingly/backend/convex/_generated/api";

import type { DataTableInvite } from "./columns";
import type { DataTableFilterField } from "~/components/data-table/types";
import { DataTable } from "~/components/data-table/data-table";
import { DataTableToolbar } from "~/components/data-table/data-table-toolbar";
import { useDataTable } from "~/lib/hooks/useDataTable";
import { getColumns } from "./columns";
import { InvitesTableToolbarActions } from "./toolbar-actions";

export function InvitesTable({
  preloaded,
}: {
  preloaded: Preloaded<typeof api.hubs.getInvites>;
}) {
  // Feature flags for showcasing some additional features. Feel free to remove them.

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), []);

  const data = usePreloadedQuery(preloaded);
  const roles = React.useMemo(() => {
    const roles = data?.map((invite) => invite.role);
    return Array.from(new Set(roles)).filter((role) => !!role);
  }, [data]);

  const filterFields: DataTableFilterField<DataTableInvite>[] = [
    {
      label: "Email",
      value: "email",
      placeholder: "Filter emails...",
    },
    {
      label: "Role",
      value: "role",
      options: roles.map((role) => {
        return{
        label: role.name,
        value: role,
        icon: role.icon,
        withCount: true,
      }}),
    },
  ];
  const tableData = React.useMemo(
    () =>
      data?.map((invite) => ({
        id: invite._id,
        email: invite.email,
        role: invite.role,
        status: invite.status,
        _creationTime: invite._creationTime,
      })),
    [data],
  );

  const { table } = useDataTable({
    data: tableData || [],
    columns,
    pageCount: 1,
    filterFields,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields}>
        <InvitesTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
