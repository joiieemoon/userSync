import { useState } from "react";

export const usepasswordtoggle = () => {
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const togglePassword = (fieldName: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return { showPassword, togglePassword };
};
