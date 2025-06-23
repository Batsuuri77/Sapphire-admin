"use client";

import { CategoryWithId } from "@/models/Category/Category";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  onEdit: (category: CategoryWithId) => void;
  onDelete: (_id: string) => void;
};

export const columns = ({
  onEdit,
  onDelete,
}: Props): ColumnDef<CategoryWithId>[] => [
  {
    accessorKey: "serial",

    header: "#",
    enableSorting: false,
    cell: ({ row, table }) => {
      const originalIndex = table
        .getSortedRowModel()
        .flatRows.findIndex((r) => r.id === row.id);
      const serial = originalIndex + 1;
      return <span>{serial}</span>;
    },
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "categorySlug",
    header: "Category Slug",
  },
  {
    accessorKey: "categoryDescription",
    header: "Category Description",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onDelete(category._id)}
            >
              Delete category
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onEdit(category)}
              className="cursor-pointer "
            >
              Update category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
