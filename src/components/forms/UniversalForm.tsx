import { FormFieldConfig } from "@/types/formInputs";
import React from "react";

interface UniversalFormProps {
  formFields: FormFieldConfig[]; // Array of form field configurations
  onSubmit: (data: Record<string, any>) => void; // Function to handle form submission
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
  formFields,
  onSubmit,
  formClassName = "",
  formTitle,
  formTitleClassName = "",
  formDescription,
  formDescriptionClassName = "",
  buttonText = "Submit",
  formButtonClassName = "",
  formButtonDisabled = false,
  formCoverImage,
  formCoverImageClassName = "",
}) => {
  return <form onSubmit={onsubmit}>UniversalForm</form>;
};

export default UniversalForm;
