"use client";
import DefaultButton from "@/components/buttons/DefaultButton";
import { PRODUCTS_ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import React from "react";

const Products = () => {
  const router = useRouter();
  const handleButton = (value?: string) => {
    const routes: Record<string, string> = {
      "add-product": PRODUCTS_ROUTES.ADD_PRODUCT,
      "add-category": PRODUCTS_ROUTES.ADD_CATEGORY,
    };

    if (!value) return;
    const route = routes[value];
    if (route) router.push(route);
  };

  return (
    <div className="flex flex-row items-center justify-between w-full h-full bg-gray-100 p-4 gap-4">
      <DefaultButton
        variant="primary"
        text={"Add product"}
        value={"add-product"}
        type={"button"}
        onClick={handleButton}
      />
      <DefaultButton
        variant="primary"
        text={"Add category"}
        value={"add-category"}
        type={"button"}
        onClick={handleButton}
      />
    </div>
  );
};

export default Products;
