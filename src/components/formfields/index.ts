export type AuthMode = "login" | "signup";

export interface AuthFormData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  profileImage?: File | null;
}
