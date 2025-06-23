"use client";

import { SubCategoryWithId } from "@/models/Category/SubCategory";
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
  onEdit: (subCategory: SubCategoryWithId) => void;
  onDelete: (_id: string) => void;
};

export const columns = ({
  onEdit,
  onDelete,
}: Props): ColumnDef<SubCategoryWithId>[] => [
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
    accessorKey: "subCategoryName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subcategory Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "subCategorySlug",
    header: "Subcategory Slug",
  },
  {
    accessorKey: "categoryId.categoryName",
    header: "Parent Category",
  },
  {
    accessorKey: "subCategoryDescription",
    header: "Subcategory Description",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const subCategory = row.original;
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
              onClick={() => onDelete(subCategory._id)}
            >
              Delete subcategory
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onEdit(subCategory)}
              className="cursor-pointer "
            >
              Update subcategory
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
