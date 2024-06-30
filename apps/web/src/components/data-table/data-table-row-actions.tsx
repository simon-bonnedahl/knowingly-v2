"use client";

import type { Row, TableMeta } from "@tanstack/react-table";

import { Button } from "@knowingly/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@knowingly/ui/dropdown";
import { IconDots } from "@tabler/icons-react";
import { capitalizeFirstLetter } from "~/lib/utils";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  meta: TableMeta<TData> | undefined;
  actions?: Record<
    string,
    {
      action: (id: string) => void;
      deleteRow?: boolean;
    }
  >;
}

export function DataTableRowActions<TData>({
  row,
  meta,
  actions,
}: DataTableRowActionsProps<TData>) {
  const onClickHandler = async (
    action: (id: string) => void,
    deleteRow = false,
  ) => {
    action(row.getValue("id"));
    if (deleteRow) {
      meta?.deleteRow(row);
      return;
    }
  };
  if (!actions) return null;

  if (Object.entries(actions).filter(([value]) => !!value).length === 0)
    return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <IconDots className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px] bg-background">
        {actions &&
          Object.entries(actions).map(([key, value]) => {
            if (value)
              return (
                <DropdownMenuItem
                  key={key}
                  onClick={() => onClickHandler(value.action, value.deleteRow)}
                >
                  {capitalizeFirstLetter(key)}
                </DropdownMenuItem>
              );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
