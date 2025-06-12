"use client";
import React from "react";
import UniversalForm from "@/components/forms/UniversalForm";
import { LOGO } from "@/utils/imagePaths";
import { FormFieldConfig } from "@/types/formInputs";

const productFormFields: FormFieldConfig[] = [
  {
    type: "image",
    label: "Product images",
    id: "productImages",
    required: true,
  },
  {
    type: "text",
    label: "Product Name",
    id: "productName",
    required: true,
  },
  {
    type: "select",
    label: "Parent Category",
    id: "parentCategory",
    required: true,
    options: [
      { value: "framed", label: "Frame" },
      { value: "metal", label: "Metal" },
    ],
  },
  {
    type: "textarea",
    label: "Description",
    textAreaRows: 6,
    id: "description",
    required: true,
  },
  {
    type: "select",
    label: "Category",
    id: "category",
    required: true,
    options: [
      { value: "map", label: "Map" },
      { value: "art", label: "Art" },
    ],
  },
];

const AddProduct = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      <UniversalForm
        formTitle="Add New Product"
        formDescription="Fill out the details below to add a new product."
        formCoverImage={LOGO.light}
        formFields={productFormFields}
        onSubmit={(data) => {
          console.log("Submitted data:", data);
        }}
      />
    </div>
  );
};

export default AddProduct;
