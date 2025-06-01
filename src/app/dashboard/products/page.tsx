"use client";
import DefaultButton from "@/components/buttons/DefaultButton";
import { PRODUCTS_ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import React from "react";

const Products = () => {
  const router = useRouter();
  const handleAddProduct = () => {
    router.push(PRODUCTS_ROUTES.ADD_PRODUCT);
  };

  return (
    <div>
      <DefaultButton
        variant="primary"
        text={"Add product"}
        type={"button"}
        onClick={handleAddProduct}
      />
    </div>
  );
};

export default Products;
