"use client";
import { FormFieldConfig } from "@/types/formInputs";
import React from "react";
import Image from "next/image";
import DefaultButton from "../buttons/DefaultButton";

interface UniversalFormProps {
  formFields: FormFieldConfig[]; // Array of form field configurations
  onSubmit: (data: Record<string, unknown>) => void; // Function to handle form submission
  outerClassName?: string;
  formClassName?: string; // Optional class names for the form
  formTitle?: string; // Optional title for the form
  formTitleClassName?: string; // Optional class names for the form title
  formDescription?: string; // Optional description for the form
  formDescriptionClassName?: string; // Optional class names for the form description
  buttonText?: string; // Optional text for the submit button
  formButtonClassName?: string; // Optional class names for the submit button
  formButtonDisabled?: boolean; // Whether the submit button should be disabled
  formCoverImage?: string; // Optional cover image for the form
  formCoverImageClassName?: string; // Optional class names for the cover image
}

const UniversalForm: React.FC<UniversalFormProps> = ({
  outerClassName = "",
  formTitle,
  formTitleClassName = "",
  formDescription,
  formDescriptionClassName = "",
  formFields,
  onSubmit,
  formClassName,
  buttonText = "Submit",
  formButtonClassName,
  formButtonDisabled = false,
  formCoverImage,
  formCoverImageClassName = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center w-full 
 justify-center gap-8 px-20 py-10 bg-white rounded-lg shadow-md dark:bg-secondary-dark ${outerClassName}`}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <h1
          className={`text-3xl font-semibold text-center  text-black ${formTitleClassName}`}
        >
          {formTitle || "Form Title"}
        </h1>
        <p
          className={`text-center text-md text-muted-foreground ${formDescriptionClassName}`}
        >
          {formDescription || "Please fill out the form below."}
        </p>
      </div>
      <form
        className={`flex flex-col items-center justify-center gap-4 w-full ${formClassName}`}
        onSubmit={(e) => {
          e.preventDefault();
          const formData: Record<string, unknown> = {};
          formFields.forEach((field) => {
            const inputElement = document.getElementById(
              field.id
            ) as HTMLInputElement;
            if (inputElement) {
              formData[field.id] =
                field.type === "checkbox"
                  ? inputElement.checked
                  : inputElement.value;
            }
          });
          onSubmit(formData);
        }}
      >
        {formCoverImage && (
          <Image
            src={formCoverImage}
            alt="Form Cover"
            width={100}
            height={50}
            className={`w-2/4 h-50 object-contain rounded-md ${formCoverImageClassName}`}
          />
        )}
        <DefaultButton text={buttonText} type={"button"} />
      </form>
    </div>
  );
};

export default UniversalForm;
