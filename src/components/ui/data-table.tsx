"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Column,
} from "@tanstack/react-table"
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/icon"
import { H3, BodySmall } from "@/components/ui/typography"

// Enhanced Table Component
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  title?: string
  description?: string
  searchPlaceholder?: string
  showColumnToggle?: boolean
  showPagination?: boolean
  pageSize?: number
  emptyState?: {
    title?: string
    description?: string
    icon?: string
    action?: {
      label: string
      onClick: () => void
    }
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title,
  description,
  searchPlaceholder = "Search...",
  showColumnToggle = true,
  showPagination = true,
  pageSize = 10,
  emptyState,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  const selectedRows = table.getFilteredSelectedRowModel().rows.length
  const totalRows = table.getFilteredRowModel().rows.length

  return (
    <Card>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        {/* Table Controls */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative">
              <Icon name="search-line" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={searchPlaceholder}
                value={globalFilter ?? ""}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="pl-10 w-[300px]"
              />
            </div>
            {selectedRows > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedRows} of {totalRows} selected
              </Badge>
            )}
          </div>
          {showColumnToggle && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <Icon name="eye-line" className="mr-2 h-4 w-4" />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="h-12">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <EmptyState {...emptyState} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {showPagination && (
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
              <div className="flex items-center space-x-2">
                <BodySmall className="text-sm font-medium">Rows per page</BodySmall>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value))
                  }}
                  className="h-8 w-[70px] rounded border border-input bg-background px-3 py-1 text-sm"
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <Icon name="arrow-left-s-line" className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <Icon name="arrow-left-line" className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <Icon name="arrow-right-line" className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <Icon name="arrow-right-s-line" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Empty State Component
interface EmptyStateProps {
  title?: string
  description?: string
  icon?: string
  action?: {
    label: string
    onClick: () => void
  }
}

function EmptyState({ 
  title = "No data available", 
  description = "There are no items to display at the moment.",
  icon = "database-2-line",
  action 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="p-3 bg-muted rounded-full mb-4">
        <Icon name={icon} className="h-6 w-6 text-muted-foreground" />
      </div>
      <H3 className="text-lg font-medium mb-2">{title}</H3>
      <BodySmall className="text-muted-foreground text-center mb-4 max-w-sm">
        {description}
      </BodySmall>
      {action && (
        <Button onClick={action.onClick} size="sm">
          {action.label}
        </Button>
      )}
    </div>
  )
}

// Enhanced Column Components
export function SortableColumn<TData, TValue>({
  column,
  title,
  children,
}: {
  column: Column<TData, TValue>
  title: string
  children?: React.ReactNode
}) {
  const isSorted = column.getIsSorted()

  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="h-auto p-0 font-medium hover:bg-transparent"
    >
      {title}
      {isSorted === "asc" ? (
        <ChevronUp className="ml-2 h-4 w-4" />
      ) : isSorted === "desc" ? (
        <ChevronDown className="ml-2 h-4 w-4" />
      ) : (
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      )}
      {children}
    </Button>
  )
}

// Status Badge Component
export function StatusBadge({ 
  status, 
  variant = "default" 
}: { 
  status: string
  variant?: "default" | "secondary" | "destructive" | "outline"
}) {
  const statusConfig = {
    active: { label: "Active", variant: "default" as const },
    inactive: { label: "Inactive", variant: "secondary" as const },
    pending: { label: "Pending", variant: "outline" as const },
    error: { label: "Error", variant: "destructive" as const },
    success: { label: "Success", variant: "default" as const },
    warning: { label: "Warning", variant: "outline" as const },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || { 
    label: status, 
    variant: "secondary" as const 
  }

  return <Badge variant={config.variant}>{config.label}</Badge>
}

// Action Button Component
export function ActionButton({ 
  icon, 
  label, 
  onClick, 
  variant = "ghost",
  size = "sm"
}: { 
  icon: string
  label: string
  onClick: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}) {
  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <Icon name={icon} className="h-4 w-4" />
    </Button>
  )
}

// Data Table with Actions
export function DataTableWithActions<TData, TValue>({
  columns,
  data,
  title,
  description,
  actions,
  ...props
}: DataTableProps<TData, TValue> & {
  actions?: {
    label: string
    icon: string
    onClick: () => void
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  }[]
}) {
  return (
    <div className="space-y-4">
      {actions && actions.length > 0 && (
        <div className="flex items-center justify-between">
          <div>
            {title && <H3>{title}</H3>}
            {description && <BodySmall className="text-muted-foreground">{description}</BodySmall>}
          </div>
          <div className="flex items-center space-x-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "default"}
                onClick={action.onClick}
                size="sm"
              >
                <Icon name={action.icon} className="h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}
      <DataTable columns={columns} data={data} {...props} />
    </div>
  )
}
