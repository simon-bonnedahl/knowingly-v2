"use client";
"use memo";

import type { Preloaded } from "convex/react";
import * as React from "react";
import { usePreloadedQuery, useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";

import type { DataTableFilterField } from "~/components/data-table/types";
import { DataTable } from "~/components/data-table/data-table";
import { DataTableToolbar } from "~/components/data-table/data-table-toolbar";
import { useDataTable } from "~/lib/hooks/useDataTable";
import { DataTableSupportTicket, getColumns } from "./columns";
import { capitalizeFirstLetter } from "@knowingly/utils";

export function SupportTicketTable({
  preloaded,
}: {
  preloaded: Preloaded<typeof api.supportTickets.list>;
}) {
  const columns = React.useMemo(() => getColumns(), []);

  const data = usePreloadedQuery(preloaded);

  const filterFields: DataTableFilterField<DataTableSupportTicket>[] = [
    {
      label: "Title",
      value: "title",
      placeholder: "Filter titles...",
    },
    {
      label: "Status",
      value: "status",
      options: ["OPEN", "PENDING", "CLOSED"].map((status) => {
        return {
          label: capitalizeFirstLetter(status),
          value: status,
          withCount: true,
        };
      }),
    },
  
  ];

  const tableData = React.useMemo(
    () =>
      data.map((ticket) => ({
        id: ticket._id,
        user: ticket.user,
        title: ticket.title,
        category: ticket.category,
        status: ticket.status,
        body: ticket.body,
        files: ticket.files,
        _creationTime: ticket._creationTime,
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
