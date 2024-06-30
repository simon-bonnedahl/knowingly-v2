import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    deleteRow: (row: Row<TData>) => void;
  }
}
