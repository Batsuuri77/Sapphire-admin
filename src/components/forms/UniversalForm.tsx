"use client";
import { FormFieldConfig } from "@/types/formInputs";
import React, { useEffect } from "react";
import Image from "next/image";
import DefaultButton from "../buttons/DefaultButton";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface UniversalFormProps {
  formFields: FormFieldConfig[];
  onSubmit: (data: Record<string, unknown>) => void;
  onFieldChange?: (fieldId: string, value: string) => void;
  outerClassName?: string;
  formClassName?: string;
  formTitle?: string;
  formTitleClassName?: string;
  formDescription?: string;
  formDescriptionClassName?: string;
  buttonText?: string;
  formButtonClassName?: string;
  formButtonDisabled?: boolean;
  formCoverImage?: string;
  formCoverImageClassName?: string;
  initialValues?: Record<string, unknown>;
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
  formCoverImage,
  formCoverImageClassName = "",
  onFieldChange,
  initialValues,
}) => {
  const [formValues, setFormValues] = React.useState<Record<string, unknown>>(
    initialValues || {}
  );

  useEffect(() => {
    if (initialValues) {
      setFormValues((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  useEffect(() => {
    localStorage.removeItem("formData");
  }, []);

  return (
    <div
      className={`flex flex-col items-center w-full h-fit justify-center gap-8 p-8 shadow-md dark:bg-secondary-dark ${outerClassName}`}
    >
      {formCoverImage && (
        <Image
          src={formCoverImage}
          alt="Form Cover"
          width={100}
          height={50}
          className={`w-2/4 h-30 object-contain rounded-md ${formCoverImageClassName}`}
        />
      )}
      <div className="flex flex-col items-center justify-center gap-4">
        <h1
          className={`text-xl font-semibold text-center text-black ${formTitleClassName}`}
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
        className={`flex flex-col items-center justify-center gap-4 w-full text-sm text-gray-700 ${formClassName}`}
        onSubmit={(e) => {
          e.preventDefault();
          const formData: Record<string, unknown> = {};
          formFields.forEach((field) => {
            formData[field.id] = formValues[field.id];
          });
          onSubmit(formData);
        }}
      >
        {formFields.map((field) => (
          <div key={field.id} className={`w-full ${field.boxClassName || ""}`}>
            <label htmlFor={field.id} className="block font-medium ">
              {field.label}
            </label>

            {field.type === "text" ||
            field.type === "email" ||
            field.type === "password" ? (
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                disabled={field.disabled}
                value={(formValues[field.id] as string) || ""}
                className={`mt-1 py-2 px-3 w-full border rounded-md ${
                  field.className || ""
                }`}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormValues((prev) => ({ ...prev, [field.id]: val }));
                  onFieldChange?.(field.id, val);
                }}
              />
            ) : field.type === "select" ? (
              <select
                id={field.id}
                required={field.required}
                disabled={field.disabled}
                value={(formValues[field.id] as string) || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormValues((prev) => ({ ...prev, [field.id]: val }));
                  onFieldChange?.(field.id, val);
                }}
                className={`mt-1 py-2 px-3 w-full border text-sm rounded-md text-gray-700 ${
                  field.className || ""
                }`}
              >
                <option value="" className="text-sm text-gray-500">
                  Select an option
                </option>
                {field.options?.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="text-sm text-gray-700"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === "checkbox" ? (
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id={field.id}
                  checked={!!formValues[field.id]}
                  onChange={(e) => {
                    const val = e.target.checked;
                    setFormValues((prev) => ({ ...prev, [field.id]: val }));
                    onFieldChange?.(field.id, val.toString());
                  }}
                  className="mr-2"
                />
                <label htmlFor={field.id} className="text-sm">
                  {field.label}
                </label>
              </div>
            ) : field.type === "textarea" ? (
              <textarea
                id={field.id}
                rows={field.textAreaRows || 4}
                placeholder={field.placeholder}
                required={field.required}
                disabled={field.disabled}
                value={(formValues[field.id] as string) || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormValues((prev) => ({ ...prev, [field.id]: val }));
                  onFieldChange?.(field.id, val);
                }}
                className={`mt-1 py-2 px-3 w-full border rounded-md ${
                  field.className || ""
                }`}
              />
            ) : field.type === "image" ? (
              <div className="mt-1 w-full">
                <div className="flex flex-wrap gap-2">
                  {field.multiple
                    ? Array.isArray(formValues[field.id]) &&
                      (formValues[field.id] as string[]).map((imgUrl, i) => (
                        <div
                          key={imgUrl + i}
                          className="relative w-50 h-50 border rounded overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setFormValues((prev) => {
                                const updated = [
                                  ...((prev[field.id] as string[]) || []),
                                ];
                                updated.splice(i, 1);
                                return { ...prev, [field.id]: updated };
                              });
                            }}
                            className="absolute top-1 right-1 p-0.5 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                          <Image
                            src={imgUrl}
                            alt={`preview`}
                            className="object-cover w-full h-full"
                            width={50}
                            height={50}
                          />
                        </div>
                      ))
                    : typeof formValues[field.id] === "string" &&
                      formValues[field.id] !== "" && (
                        <div className="relative w-50 h-50 border rounded overflow-hidden">
                          <button
                            type="button"
                            onClick={() => {
                              setFormValues((prev) => ({
                                ...prev,
                                [field.id]: undefined,
                              }));
                            }}
                            className="absolute top-1 right-1 p-0.5 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                          <Image
                            src={formValues[field.id] as string}
                            alt={`preview`}
                            className="object-cover w-full h-full"
                            width={50}
                            height={50}
                          />
                        </div>
                      )}

                  <label
                    htmlFor={`upload-${field.id}`}
                    className="flex items-center justify-center w-50 h-50 border border-dashed rounded-md cursor-pointer text-gray-500 hover:bg-gray-100"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </label>
                  <input
                    id={`upload-${field.id}`}
                    type="file"
                    accept="image/*"
                    multiple={field.multiple}
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        const fileURLs = Array.from(files).map((file) =>
                          URL.createObjectURL(file)
                        );
                        setFormValues((prev) => ({
                          ...prev,
                          [field.id]: field.multiple
                            ? [
                                ...((prev[field.id] as string[]) || []),
                                ...fileURLs,
                              ]
                            : fileURLs[0],
                        }));
                      }
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        ))}
        <DefaultButton text={buttonText} type={"submit"} />
      </form>
    </div>
  );
};

export default UniversalForm;
