"use client";
import React from "react";
import UniversalForm from "@/components/forms/UniversalForm";
import { LOGO } from "@/utils/imagePaths";
import { Checkbox } from "@radix-ui/react-checkbox";

const AddProduct = () => {
  return (
    <div>
      <UniversalForm
        formTitle="Add New Product"
        formDescription="Fill out the details below to add a new product."
        formCoverImage={LOGO.light}
        formFields={[]}
        onSubmit={function (data: Record<string, unknown>): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default AddProduct;
