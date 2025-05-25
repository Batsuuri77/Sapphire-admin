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
