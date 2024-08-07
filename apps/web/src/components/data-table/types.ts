import { Icon } from "@knowingly/backend/convex/types"

export interface Option {
    label: string
    value: any
    icon?: Icon
    withCount?: boolean
  }
  

export interface DataTableFilterField<TData> {
    label: string
    value: keyof TData
    placeholder?: string
    options?: Option[]
  }
  
  export interface DataTableFilterOption<TData> {
    id: string
    label: string
    value: keyof TData
    options: Option[]
    filterValues?: string[]
    filterOperator?: string
    isMulti?: boolean
  }