import React from "react";
import Image from "next/image";
import { LOGO } from "@/utils/imagePaths";
import { ButtonInputs } from "@/types/buttonInputs";

const DownloadButton: React.FC<ButtonInputs> = ({
  additionalClassName,
  title,
  text,
  icon,
  iconPosition,
  iconAlt,
  iconSize,
  iconWidth = 20,
  iconHeight = 20,
  loading,
  loadingText,
  variant,
  iconClassName,
  size,
  onClick,
  disabled,
  children,
  type,
  ...props
}) => {
  return (
    <div>
      <button
        className={`flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 cursor-pointer ${additionalClassName}`}
        {...props}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        <Image
          src={icon ?? LOGO.light}
          alt={iconAlt ?? "Download icon"}
          width={iconWidth}
          height={iconHeight}
          className={`${
            iconPosition === "left" ? "mr-2" : "ml-2"
          } ${iconClassName}`}
        ></Image>
        <span className="text-sm font-medium">{title}</span>
        <span className="text-sm font-medium">{text}</span>
      </button>
    </div>
  );
};

export default DownloadButton;
