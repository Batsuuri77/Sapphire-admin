"use client";
import UniversalForm from "@/components/forms/UniversalForm";
import { FormFieldConfig } from "@/types/formInputs";
import React, { useState } from "react";
import slugify from "slugify";

const Category = () => {
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});

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
      id: "slug",
      disabled: true,
      required: true,
    },
    {
      type: "image",
      label: "Category images",
      id: "categoryImages",
      required: true,
    },
    {
      type: "textarea",
      label: "Description",
      id: "description",
      required: true,
    },
  ];

  const handleFieldChange = (fieldId: string, value: string) => {
    if (fieldId === "categoryName") {
      const generated = slugify(value, { lower: true, strict: true });
      setFormValues((prev) => ({
        ...prev,
        [fieldId]: value,
        slug: generated, // ✅ Update slug
      }));
    } else {
      setFormValues((prev) => ({ ...prev, [fieldId]: value }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full bg-white ">
      <div className="flex items-center justify-start w-full px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">Categories</h1>
      </div>
      <div className="flex flex-row items-center justify-between w-full ">
        <div className="w-full max-w-xl">
          <UniversalForm
            formTitle="Add New Category"
            formDescription="Fill out the details below to add a new category."
            formFields={categoryFormFields}
            onSubmit={(data) => console.log("Submitted:", data)}
            onFieldChange={handleFieldChange}
            initialValues={formValues}
          />
        </div>
        <div className="flex w-full items-center justify-center">
          Category list
        </div>
      </div>
    </div>
  );
};

export default Category;
