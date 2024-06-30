"use client";

import type { Table } from "@tanstack/react-table";


import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { IconSearch, IconX } from "@tabler/icons-react";
import { Input } from "@knowingly/ui/input";
import { capitalizeFirstLetter } from "~/lib/utils";
import { Button } from "@knowingly/ui/button";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchColumn: string;
  filters?: Record<string, string[]>;
}

export function DataTableToolbar<TData>({
  table,
  searchColumn,
  filters,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <IconSearch className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="w-64 pl-8 md:w-96"
            value={
              (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
          />
        </div>
        {filters &&
          Object.entries(filters).map(([key, values]) => (
            <div key={key}>
              {table.getColumn(key) && (
                <DataTableFacetedFilter
                  column={table.getColumn(key)}
                  title={capitalizeFirstLetter(key)}
                  options={values.map((value) => ({
                    label: capitalizeFirstLetter(value),
                    value,
                  }))}
                />
              )}
            </div>
          ))}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <IconX className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
