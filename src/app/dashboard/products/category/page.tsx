"use client";
import UniversalForm from "@/components/forms/UniversalForm";
import { FormFieldConfig } from "@/types/formInputs";
import { POSTROUTES } from "@/utils/apiRoutes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import slugify from "slugify";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { PRODUCTS_ROUTES } from "@/utils/routes";
import { CategoryWithId } from "@/models/Category/Category";

const Category = () => {
  const [formValues, setFormValues] = useState<Record<string, unknown>>({
    editingId: null,
    categoryName: "",
    categorySlug: "",
    categoryImage: "",
    categoryDescription: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [categories, setCategories] = useState<Record<string, string>[]>([]);
  const categoryFormFields: FormFieldConfig[] = [
    {
      type: "text",
      label: "Category Name",
      id: "categoryName",
      required: true,
    },
    {
      type: "text",
      label: "Slug",
      id: "categorySlug",
      disabled: true,
      required: true,
    },
    {
      type: "image",
      label: "Category image",
      id: "categoryImage",
      multiple: false,
      required: true,
    },
    {
      type: "textarea",
      label: "Description",
      id: "categoryDescription",
      required: true,
    },
  ];

  async function fetchCategories() {
    try {
      const res = await fetch("/api/category");
      const result = await res.json();
      if (res.ok && result.data) {
        setCategories(result.data);
      } else {
        console.error("Fetch error:", result.error);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }

  const numberedCategories = categories.map((cat, index) => ({
    ...cat,
    _id: cat._id,
    serial: index + 1,
    categoryName: cat.categoryName,
    categorySlug: cat.categorySlug,
    categoryDescription: cat.categoryDescription,
    createdAt: new Date(cat.createdAt),
    updatedAt: new Date(cat.updatedAt),
    categoryImage: cat.categoryImage ?? null,
    editingId: cat.editingId ?? "", // Ensure editingId is present
  }));

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFieldChange = (fieldId: string, value: string) => {
    if (fieldId === "categoryName") {
      const generated = slugify(value, { lower: true, strict: true });
      setFormValues((prev) => ({
        ...prev,
        [fieldId]: value,
        categorySlug: generated,
      }));
    } else {
      setFormValues((prev) => ({ ...prev, [fieldId]: value }));
    }
  };

  const handleSubmit = async () => {
    const { editingId, ...rest } = formValues;
    const body = editingId ? { _id: editingId, ...rest } : rest;

    try {
      const res = await fetch(
        editingId ? `/api/category/${editingId}` : POSTROUTES.category,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      console.log("Category response:", data);

      setSuccessMessage(
        editingId
          ? "Category has been updated successfully!"
          : "Category has been created successfully!"
      );

      setFormValues({
        editingId: null,
        categoryName: "",
        categorySlug: "",
        categoryImage: "",
        categoryDescription: "",
      });

      await fetchCategories();

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.log("Form submitting error: ", error);
    }
  };

  const onDelete = async (_id: string) => {
    try {
      const res = await fetch(`/api/category/${_id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      console.log("Category deleted:", data);
      setSuccessMessage("Category has been deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
      // Refresh the categories after deletion
      fetchCategories();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const onEdit = (category: CategoryWithId) => {
    if (
      typeof category !== "object" ||
      category === null ||
      !("_id" in category)
    ) {
      console.error("Invalid category object passed to onEdit");
      return;
    }

    const typedCategory = category as CategoryWithId;

    console.log("Edit category:", typedCategory);

    setFormValues({
      editingId: category._id,
      categoryName: category.categoryName,
      categorySlug: category.categorySlug,
      categoryImage: category.categoryImage ?? "",
      categoryDescription: category.categoryDescription,
    });
  };

  return (
    <div className="flex flex-col items-center justify-between w-full bg-white relative">
      <div className="flex items-center justify-between w-full px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">Categories</h1>
        <Button
          variant="outline"
          className="cursor-pointer hover:bg-blue-500 hover:text-white"
        >
          <Link href={PRODUCTS_ROUTES.SUBCATEGORY}>Add Subcategory</Link>
        </Button>
      </div>

      <div className="flex flex-row items-center w-full justify-between gap-4">
        <div className="w-full max-w-xl">
          <UniversalForm
            formTitle={
              formValues.editingId ? "Edit Category" : "Add New Category"
            }
            formDescription="Fill out the details below to add a new category."
            formFields={categoryFormFields}
            onSubmit={handleSubmit}
            onFieldChange={handleFieldChange}
            initialValues={formValues}
            onCancel={() => {
              setFormValues({
                editingId: null,
                categoryName: "",
                categorySlug: "",
                categoryImage: "",
                categoryDescription: "",
              });
            }}
          />
          {successMessage && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-300 font-medium">
              {successMessage}
            </div>
          )}
        </div>
        <div className="w-full p-4 flex flex-col items-center justify-between gap-8">
          <h1 className="text-xl font-semibold text-gray-800">Category list</h1>

          <div className="container mx-auto py-10">
            <DataTable
              columns={columns({ onEdit, onDelete })}
              data={numberedCategories}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
