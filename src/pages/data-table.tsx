"use client";

import * as React from "react";
import {
  CaretSortIcon,
  PersonIcon,
  UploadIcon,
  ResetIcon,
} from "@radix-ui/react-icons";
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
  phone: string;
  email: string;
};

const data: User[] = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    position: "Manager",
    phone: "1234567890",
    email: "john.doe@example.com",
  },
  {
    id: "2",
    first_name: "Jane",
    last_name: "Smith",
    position: "Developer",
    phone: "9876543210",
    email: "jane.smith@example.com",
  },
  {
    id: "3",
    first_name: "Michael",
    last_name: "Johnson",
    position: "Designer",
    phone: "5551234567",
    email: "michael.johnson@example.com",
  },
  {
    id: "4",
    first_name: "Emily",
    last_name: "Brown",
    position: "Marketing Specialist",
    phone: "5559876543",
    email: "emily.brown@example.com",
  },
  {
    id: "5",
    first_name: "David",
    last_name: "Taylor",
    position: "Project Manager",
    phone: "5557890123",
    email: "david.taylor@example.com",
  },
  {
    id: "6",
    first_name: "Jennifer",
    last_name: "Martinez",
    position: "Sales Representative",
    phone: "5554567890",
    email: "jennifer.martinez@example.com",
  },
  {
    id: "7",
    first_name: "Matthew",
    last_name: "Wilson",
    position: "Software Engineer",
    phone: "5552345678",
    email: "matthew.wilson@example.com",
  },
  {
    id: "8",
    first_name: "Jessica",
    last_name: "Garcia",
    position: "HR Coordinator",
    phone: "5558901234",
    email: "jessica.garcia@example.com",
  },
  {
    id: "9",
    first_name: "Christopher",
    last_name: "Lopez",
    position: "Accountant",
    phone: "5556789012",
    email: "christopher.lopez@example.com",
  },
  {
    id: "10",
    first_name: "Amanda",
    last_name: "Hernandez",
    position: "Customer Service Representative",
    phone: "5550123456",
    email: "amanda.hernandez@example.com",
  },
];

const EditableCell: React.FC<{ row: any; accessorKey: keyof User }> = ({
  row,
  accessorKey,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState(row.original[accessorKey]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSave = () => {
    row.original[accessorKey] = value;
    setIsEditing(false);
  };

  return isEditing ? (
    <Input
      value={value}
      onChange={handleChange}
      onBlur={handleSave}
      autoFocus
      className=" w-fit"
    />
  ) : (
    <div onDoubleClick={handleDoubleClick}>{value}</div>
  );
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        First Name
        <CaretSortIcon
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => <EditableCell row={row} accessorKey="first_name" />,
    enableSorting: true,
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last Name
        <CaretSortIcon
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => <EditableCell row={row} accessorKey="last_name" />,
    enableSorting: true,
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Position
        <CaretSortIcon
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => <EditableCell row={row} accessorKey="position" />,
    enableSorting: true,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Phone
        <CaretSortIcon
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => <EditableCell row={row} accessorKey="phone" />,
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <CaretSortIcon
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    enableSorting: true,
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 mx-12 mt-12">
        <div className="ml-auto justify-between grid grid-cols-3 gap-4">
          <div>
            <Button>
              <UploadIcon />
              Save
            </Button>
          </div>
          <div>
            <Button>
              <PersonIcon />
              Add
            </Button>
          </div>
          <div>
            <Button>
              <ResetIcon />
              Reset
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-md border mx-12">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
