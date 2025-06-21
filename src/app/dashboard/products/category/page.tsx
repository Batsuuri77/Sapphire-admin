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

const Category = () => {
  const [formValues, setFormValues] = useState<Record<string, unknown>>({
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
    serial: index + 1,
    categoryName: cat.categoryName,
    categorySlug: cat.categorySlug,
    categoryDescription: cat.categoryDescription,
    createdAt: new Date(cat.createdAt),
    updatedAt: new Date(cat.updatedAt),
    categoryImage: cat.categoryImage ?? null,
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
    const body = {
      categoryName: formValues.categoryName,
      categorySlug: formValues.categorySlug,
      categoryImage: formValues.categoryImage,
      categoryDescription: formValues.categoryDescription,
    };

    try {
      const res = await fetch(POSTROUTES.category, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSuccessMessage("Category has been created successfully!");
      setFormValues({
        categoryName: "",
        categorySlug: "",
        categoryImage: "",
        categoryDescription: "",
      });

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.log("Form submitting error: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full bg-white relative">
      <div className="flex items-center justify-between w-full px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">Categories</h1>
        <Button
          variant="outline"
          className="cursor-pointer hover:bg-blue-500 hover:text-white"
        >
          <Link href={PRODUCTS_ROUTES.SUBCATEGORY}>Add Subcategory</Link>
        </Button>
      </div>

      <div className="flex flex-row items-center w-full">
        <div className="w-full max-w-xl">
          <UniversalForm
            formTitle="Add New Category"
            formDescription="Fill out the details below to add a new category."
            formFields={categoryFormFields}
            onSubmit={handleSubmit}
            onFieldChange={handleFieldChange}
            initialValues={formValues}
          />
          {successMessage && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-300 font-medium">
              {successMessage}
            </div>
          )}
        </div>
        <div className="w-full p-4 flex flex-col items-center justify-between gap-8">
          <div className="flex w-full items-center justify-center">
            Category list
          </div>

          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={numberedCategories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
