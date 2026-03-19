"use client";

import * as React from "react";
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
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Eye,
  Trash2,
  Edit,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import InvoiceStatusSelect from "./InvoiceStatusSelect";

export type InvoiceData = {
  id: string;
  clientName: string;
  status: "DRAFT" | "SENT" | "VIEWED" | "PAID" | "OVERDUE" | "CANCELLED";
  total: number;
  subtotal: number;
  itemCount: number;
  createdAt: string;
};

export const columns: ColumnDef<InvoiceData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onChange={(event) => table.toggleAllPageRowsSelected(!!event.target.checked)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={(event) => row.toggleSelected(!!event.target.checked)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "clientName",
    header: "Client Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("clientName")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const invoice = row.original;
      return (
        <InvoiceStatusSelect
          invoiceId={invoice.id}
          currentStatus={row.getValue("status")}
        />
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium tabular-nums">{formatted}</div>;
    },
  },
  {
    accessorKey: "subtotal",
    header: () => <div className="text-right">Subtotal</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("subtotal"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right text-muted-foreground tabular-nums">{formatted}</div>;
    },
  },
  {
    accessorKey: "itemCount",
    header: () => <div className="text-right">Items</div>,
    cell: ({ row }) => {
      return <div className="text-right text-muted-foreground tabular-nums">{row.getValue("itemCount")}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-muted-foreground tabular-nums">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const invoice = row.original;
      const meta = table.options.meta as {
        deleteInvoice: (id: string | string[]) => void;
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem render={
                <Link href={`/invoice/${invoice.id}`} className="cursor-pointer">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              } />
              <DropdownMenuItem render={
                <Link href={`/invoice/${invoice.id}/edit`} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Invoice
                </Link>
              } />
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer"
                onSelect={() => meta.deleteInvoice(invoice.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Invoice
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface InvoiceDataTableProps {
  data: InvoiceData[];
}

export function InvoiceDataTable({ data }: InvoiceDataTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [activeTab, setActiveTab] = React.useState<
    "ALL" | "DRAFT" | "PENDING" | "PAID"
  >("ALL");

  const [isDeleting, setIsDeleting] = React.useState(false);

  const deleteInvoice = async (id: string | string[]) => {
    const ids = Array.isArray(id) ? id : [id];
    const confirmed = window.confirm(
      `Are you sure you want to delete ${ids.length > 1 ? ids.length + " invoices" : "this invoice"}? This action cannot be undone.`
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await Promise.all(
        ids.map((invoiceId) => 
          fetch(`/api/invoices/${invoiceId}`, { method: "DELETE" })
        )
      );
      router.refresh();
      setRowSelection({});
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      deleteInvoice
    }
  });

  React.useEffect(() => {
    if (activeTab === "ALL") {
      table.getColumn("status")?.setFilterValue(undefined);
    } else if (activeTab === "PENDING") {
      table.getColumn("status")?.setFilterValue(["SENT", "VIEWED", "OVERDUE"]);
    } else {
      table.getColumn("status")?.setFilterValue([activeTab]);
    }
  }, [activeTab, table]);

  const selectedInvoices = table.getSelectedRowModel().flatRows.map(
    (row) => row.original.id
  );

  return (
    <div className="w-full space-y-4 pt-4 bg-card rounded-xl border border-border p-4 shadow-sm" id="invoices">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex -space-x-[1px] rounded-lg border border-border bg-muted/20 p-1">
          {[
            { id: "ALL", label: "All Invoices" },
            { id: "DRAFT", label: "Drafts", count: data.filter(d => d.status === "DRAFT").length },
            { id: "PENDING", label: "Pending", count: data.filter(d => ["SENT", "VIEWED", "OVERDUE"].includes(d.status)).length },
            { id: "PAID", label: "Paid", count: data.filter(d => d.status === "PAID").length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`
                relative flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors
                ${
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }
              `}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-1.5 flex items-center justify-center rounded-full bg-muted px-1.5 py-0.5 text-[10px]">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {selectedInvoices.length > 0 && (
            <Button 
               variant="destructive" 
               size="sm" 
               className="h-9 gap-1"
               onClick={() => deleteInvoice(selectedInvoices)}
               disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
              Delete {selectedInvoices.length} Selected
            </Button>
          )}

          <Input
            placeholder="Search clients..."
            value={(table.getColumn("clientName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("clientName")?.setFilterValue(event.target.value)
            }
            className="w-48 bg-background h-9 lg:w-64"
          />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  Customize Columns <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
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
                    );
                  })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/create-invoice">
            <Button size="sm" className="h-9 gap-1">
              <Plus className="h-4 w-4" />
              Create
            </Button>
          </Link>
        </div>
      </div>

      <div className="rounded-md border border-border bg-background overflow-hidden relative">
        <Table>
          <TableHeader className="bg-muted/30">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-border">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-11">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
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
                  className="group border-border"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
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
                  className="h-24 text-center text-muted-foreground"
                >
                  No invoices found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {isDeleting && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-[1px] z-10 animate-in fade-in duration-200">
             <div className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg shadow-lg">
                <AlertCircle className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm font-medium">Processing...</span>
             </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-2 text-sm text-muted-foreground pt-2">
        <div>
          {selectedInvoices.length > 0 ? (
            <span className="text-primary font-medium">{selectedInvoices.length} invoice(s) selected.</span>
          ) : (
             `Showing ${table.getFilteredRowModel().rows.length} invoice(s).`
          )}
        </div>
        <div className="flex items-center gap-4 lg:gap-8">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Rows per page</p>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="h-8 w-[70px] rounded-md border border-input bg-background px-2 py-1 text-sm outline-none"
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
            {table.getPageCount() || 1}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
