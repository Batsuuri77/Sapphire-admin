// app/stores/useFormStore.ts or wherever you keep your Zustand stores
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AdminFormData } from "../types/formInputs";

interface FormStore {
  adminData: AdminFormData;
}

const defaultAdminData: AdminFormData = {
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  phoneNumber: "",
  password: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useFormStore = create<FormStore>()(
  persist(
    () => ({
      adminData: defaultAdminData,
    }),
    {
      name: "form-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
