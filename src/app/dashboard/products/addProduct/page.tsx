"use client";
import UniversalForm from "@/components/forms/UniversalForm";
import { FormFieldConfig } from "@/types/formInputs";
import { APIROUTES } from "@/utils/apiRoutes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import slugify from "slugify";
import { Button } from "@/components/ui/button";
import { PRODUCTS_ROUTES } from "@/utils/routes";
import { SubCategoryWithId } from "@/models/Category/SubCategory";

const AddProduct = () => {
  const [formValues, setFormValues] = useState<Record<string, unknown>>({
    editingId: null,
    subCategoryName: "",
    subCategorySlug: "",
    subCategoryImage: "",
    subCategoryDescription: "",
    categoryId: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<Record<string, string>[]>(
    []
  );
  const [cat, setCat] = useState<Record<string, string>[]>([]);
  const productFormFields: FormFieldConfig[] = [
    {
      type: "text",
      label: "Product Name",
      id: "subCategoryName",
      required: true,
    },
    {
      type: "text",
      label: "Slug",
      id: "subCategorySlug",
      disabled: true,
      required: true,
    },
    {
      type: "select",
      label: "Parent Category",
      id: "categoryId",
      options: cat.map((cat) => ({
        value: cat._id,
        label: cat.categoryName,
      })),
      required: true,
    },
    {
      type: "image",
      label: "Category image",
      id: "subCategoryImage",
      multiple: false,
      required: true,
    },
    {
      type: "textarea",
      label: "Description",
      id: "subCategoryDescription",
      required: true,
    },
  ];

  async function fetchCategories() {
    try {
      const res = await fetch(APIROUTES.category);
      const result = await res.json();
      if (res.ok && result.data) {
        setCat(result.data);
      } else {
        console.error("Fetch error:", result.error);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchSubCategories() {
    try {
      const res = await fetch(APIROUTES.subCategory);
      const result = await res.json();
      if (res.ok && result.data) {
        setSubCategories(result.data);
        //console.log("Subcategories fetched successfully:", result.data);
      } else {
        console.error("Fetch error:", result.error);
      }
    } catch (err) {
      console.error("Error fetching sub categories:", err);
    }
  }
  useEffect(() => {
    fetchSubCategories();
  }, []);

  const numberedSubCategories = subCategories.map((subs, index) => {
    const category =
      typeof subs.categoryId === "object" && subs.categoryId !== null
        ? (subs.categoryId as { _id: string; categoryName: string })
        : null;
    return {
      ...subs,
      _id: subs._id,
      serial: index + 1,
      subCategoryName: subs.subCategoryName,
      subCategorySlug: subs.subCategorySlug,
      subCategoryDescription: subs.subCategoryDescription,
      categoryId: {
        _id: subs.categoryId,
        categoryName: category?.categoryName || "Unknown",
      },
      createdAt: new Date(subs.createdAt),
      updatedAt: new Date(subs.updatedAt),
      subCategoryImage: subs.subCategoryImage ?? null,
      editingId: subs.editingId ?? "",
    };
  });

  const handleFieldChange = (fieldId: string, value: string) => {
    if (fieldId === "subCategoryName") {
      const generated = slugify(value, { lower: true, strict: true });
      setFormValues((prev) => ({
        ...prev,
        [fieldId]: value,
        subCategorySlug: generated,
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
        editingId
          ? `${APIROUTES.subCategory}/${editingId}`
          : APIROUTES.subCategory,
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

      console.log("Subcategory response:", data);

      setSuccessMessage(
        editingId
          ? "Subcategory has been updated successfully!"
          : "Subcategory has been created successfully!"
      );

      setFormValues({
        editingId: null,
        subCategoryName: "",
        subCategorySlug: "",
        categoryId: "",
        subCategoryImage: "",
        subCategoryDescription: "",
      });

      await fetchSubCategories();

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.log("Form submitting error: ", error);
    }
  };

  const onDelete = async (_id: string) => {
    try {
      const res = await fetch(`${APIROUTES.subCategory}/${_id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      console.log("Subcategory deleted:", data);
      setSuccessMessage("Subcategory has been deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
      // Refresh the subcategories after deletion
      fetchSubCategories();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const onEdit = (subCategory: SubCategoryWithId) => {
    if (
      typeof subCategory !== "object" ||
      subCategory === null ||
      !("_id" in subCategory)
    ) {
      console.error("Invalid subCategory object passed to onEdit");
      return;
    }

    const typedSubCategory = subCategory as SubCategoryWithId;

    console.log("Edit subcategory:", typedSubCategory);

    setFormValues({
      editingId: subCategory._id,
      subCategoryName: subCategory.subCategoryName,
      subCategorySlug: subCategory.subCategorySlug,
      subCategoryImage: subCategory.subCategoryImage ?? "",
      subCategoryDescription: subCategory.subCategoryDescription,
    });
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full bg-white relative">
      <div className="flex items-center justify-between w-full px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">Add Product</h1>
        <Button
          variant="outline"
          className="cursor-pointer hover:bg-blue-500 hover:text-white"
        >
          <Link href={PRODUCTS_ROUTES.ADD_PRODUCT}>Add Product</Link>
        </Button>
      </div>

      <div className="flex flex-row items-center w-full justify-between gap-4">
        <div className="w-full max-w-xl flex-1/2">
          <UniversalForm
            formTitle={
              formValues.editingId ? "Edit Product" : "Add New Product"
            }
            formDescription="Fill out the details below to add a new product."
            formFields={productFormFields}
            onSubmit={handleSubmit}
            onFieldChange={handleFieldChange}
            initialValues={formValues}
            onCancel={() => {
              setFormValues({
                subCategoryName: "",
                subCategorySlug: "",
                subCategoryImage: "",
                subCategoryDescription: "",
                categoryId: { _id: "", categoryName: "" },
                editingId: null,
              });
            }}
          />
          {successMessage && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-300 font-medium">
              {successMessage}
            </div>
          )}
        </div>
        <div className="w-full p-4 flex flex-1 flex-col items-center justify-between gap-8">
          <h1 className="text-xl font-semibold text-gray-800">
            Subcategory list
          </h1>

          <div className="container mx-auto py-10"></div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
