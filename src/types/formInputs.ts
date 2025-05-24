export interface AdminFormData {
  profileImage?: string[]; // URL for the profile image
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  phoneNumber: string;
  mobileNumber?: string;
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
}
