import React from "react";
import Image from "next/image";
import { ButtonInputs } from "@/types/buttonInputs";
import { LOGO } from "@/utils/imagePaths";

const variantStyles = {
  primary: "bg-primary-button hover:bg-hover-button text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-black",
  tertiary: "bg-transparent hover:bg-gray-100 text-gray-800",
  ghost: "bg-transparent hover:bg-gray-100 text-blue-600",
};

const sizeStyles = {
  small: "px-3 py-1 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-5 py-3 text-lg",
};

const DefaultButton: React.FC<ButtonInputs> = ({
  text,
  icon = LOGO.light,
  iconAlt = "Button icon",
  iconClassName = "",
  iconSize,
  showIcon = false,
  iconWidth = 20,
  iconHeight = 20,
  iconPosition = "left",
  additionalClassName = "",
  variant = "primary",
  size = "medium",
  loading = false,
  loadingText = "Loading...",
  disabled = false,
  type = "button",
  onClick,
  children,
  ...props
}) => {
  const shouldShowIcon =
    typeof icon === "string" && icon !== "" && !loading && showIcon;

  const iconElement = shouldShowIcon && (
    <Image
      src={icon}
      alt={iconAlt}
      className={`inline-block ${iconClassName}`}
      width={iconWidth}
      height={iconHeight}
      sizes={iconSize ? `${iconSize}px` : "20px"}
    />
  );

  return (
    <div className="w-full">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`w-full py-3 text-white text-sm cursor-pointer rounded-md bg-primary-button hover:bg-hover-button transition duration-200 
        ${variantStyles[variant]} ${sizeStyles[size]} ${additionalClassName}`}
        {...props}
      >
        {loading && (
          <span className="animate-spin w-full h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
        )}

        {shouldShowIcon && iconPosition === "left" && iconElement}
        {loading ? loadingText : text}
        {shouldShowIcon && iconPosition === "right" && iconElement}

        {children}
      </button>
    </div>
  );
};

export default DefaultButton;
