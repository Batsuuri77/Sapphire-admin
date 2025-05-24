import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LOGO } from "@/utils/imagePaths";
import { ButtonInputs } from "@/types/buttonInputs";

const DownloadButton: React.FC<ButtonInputs> = ({
  additionalClassName = "",
  title,
  text,
  icon = LOGO.light,
  iconAlt = "Download icon",
  iconWidth = 20,
  iconHeight = 20,
  iconClassName = "",
  iconPosition = "left",
  type = "button",
  disabled = false,
  loading = false,
  onClick,
  children,
  href,
  ...props
}) => {
  const content = (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
      className={`flex items-center justify-center gap-2 bg-gray-100 text-gray-900 rounded-md px-4 py-2 hover:bg-gray-200 transition duration-200 cursor-pointer ${additionalClassName}`}
    >
      {iconPosition === "left" && (
        <Image
          src={icon}
          alt={iconAlt}
          width={iconWidth}
          height={iconHeight}
          className={`object-contain w-5 h-5 ${iconClassName}`}
        />
      )}
      <div className="flex flex-col items-start leading-tight">
        {title && <span className="text-xs font-semibold">{title}</span>}
        {text && <span className="text-sm font-medium">{text}</span>}
      </div>
      {iconPosition === "right" && (
        <Image
          src={icon}
          alt={iconAlt}
          width={iconWidth}
          height={iconHeight}
          className={`object-contain w-5 h-5 ${iconClassName}`}
        />
      )}
      {children}
    </button>
  );

  return href ? <Link href={href}>{content}</Link> : <div>{content}</div>;
};

export default DownloadButton;
