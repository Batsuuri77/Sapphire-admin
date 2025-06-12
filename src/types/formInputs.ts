export interface AdminFormData {
  profilePic?: string[];
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  phoneNumber: string;
  mobileNumber?: string;
  fullAddress: string;
  country: string;
  state: string;
  city: string;
  strAddress: string;
  zipCode: string;
  role: "super_admin" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminFormProps {
  adminformLabel: string; // Title for the form
  adminformContainerClassName?: string; // Optional class names for the form container
  adminformLabelClassName?: string; // Optional class names for the form label
  adminformdata: AdminFormData; // Data for the form
  setAdminFormData: (data: AdminFormData) => void; // Function to set form data
}

export interface AdminSignupData {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  createdAt: Date;
}

export interface BaseInputProps {
  inputLabel: string; // Label for the input field
  htmlFor: string; // HTML 'for' attribute for the label
  inputId: string; // ID for the input field
  inputType: string; // Type of the input field (e.g., "text", "email", "password")
  inputValue: string; // Value of the input field
  setInputValue: (value: string) => void; // Function to set the input value
  inputPlaceholder?: string; // Optional placeholder for the input field
  inputClassName?: string; // Optional class names for the input field
  inputRequired?: boolean; // Whether the input is required
  inputDisabled?: boolean; // Whether the input is disabled
  inputPattern?: string; // Optional pattern for input validation
  inputboxClassName?: string; // Optional class names for the input box
  inputError?: string; // Error message for the input field
  inputErrorClassName?: string; // Optional class names for the error message
  imageInput?: boolean; // Whether the input is for an image
  showPassword?: boolean; // Whether to show the password as plain text
  setShowPassword?: (value: boolean) => void; // Function to toggle password visibility
}

export interface ImageInputProps {
  imageInput: boolean; // Whether the input is for an image
  imageInputValue: string[]; // Array of image URLs
  setImageInput?: (value: string[]) => void; // Function to set the image input value
  imageInputClassName?: string; // Optional class names for the image input
  imageInputLabel?: string; // Label for the image input
  imageInputPlaceholder?: string; // Placeholder for the image input
  imageInputRequired?: boolean; // Whether the image input is required
  imageInputError?: string; // Error message for the image input
  imageInputErrorClassName?: string; // Optional class names for the image input error message
  imageInputDisabled?: boolean; // Whether the image input is disabled
  imageInputBoxClassName?: string; // Optional class names for the image input box
}

export interface SelectInputProps {
  selectOptions?: { value: string; label: string }[];
  selectValue?: string;
  setSelectValue?: (value: string) => void;
  selectClassName?: string;
  selectRequired?: boolean;
  selectError?: string;
  selectErrorClassName?: string;
}

export interface CheckboxInputProps {
  checkboxLabel?: string;
  checkboxId?: string;
  checkboxChecked?: boolean;
  setCheckboxChecked?: (checked: boolean) => void;
  checkboxClassName?: string;
  checkboxDisabled?: boolean;
  checkboxError?: string;
}

export interface FormInputProps
  extends Partial<BaseInputProps>,
    Partial<ImageInputProps>,
    Partial<SelectInputProps>,
    Partial<CheckboxInputProps> {
  formClassName?: string;
}

export interface FormFieldConfig {
  type:
    | "text"
    | "email"
    | "password"
    | "image"
    | "select"
    | "checkbox"
    | "textarea";
  textAreaRows?: number; // For textarea inputs, number of rows
  label: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[]; // For select inputs
  error?: string; // Error message for the field
  disabled?: boolean; // Whether the field is disabled
  value?: string | boolean; // Value for the field, can be string or boolean for checkbox
  className?: string; // Optional class names for the field
  boxClassName?: string; // Optional class names for the input box
  onChange?: (value: string | boolean) => void; // Change handler for the field
  onFieldChange?: (value: string | boolean) => void; // Change handler for the field
}
