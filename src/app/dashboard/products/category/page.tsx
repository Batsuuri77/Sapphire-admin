"use client";
import UniversalForm from "@/components/forms/UniversalForm";
import { FormFieldConfig } from "@/types/formInputs";
import { POSTROUTES } from "@/utils/apiRoutes";
import React, { useState } from "react";
import slugify from "slugify";

const Category = () => {
  const [formValues, setFormValues] = useState<Record<string, unknown>>({
    categoryname: "",
    categoryslug: "",
    categoryimage: "",
    categorydescription: "",
  });

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
      categoryname: formValues.categoryName,
      categoryslug: formValues.categorySlug,
      categoryimage: formValues.categoryimage,
      categorydescription: formValues.categoryDescription,
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
    } catch (error) {
      console.log("Form submitting error: ", error);
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
            onSubmit={handleSubmit}
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
