import type { User as loginUser } from "../../../components/common/types";
export type loginProps = {
  email: string;
  password: string;
};
export type LoginResponse = {
  token: string;
  user: loginUser;
};
export type SignupProps = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  cpassword: string;
  phone: string;
};

export type User = {
  id?: number;
  name?: string;
  email: string;
  username?: string;
  phone?: string;
  firstName: string;
  lastName: string;
  roleId?: number;
  roleTitle?: string;
  joinedAt?: string;
};
export type addEditUser = {
  id?: number;

  name?: string;
  email: string;
  username?: string;
  phone?: string;
  firstName: string;
  lastName: string;
  roleId?: number;
  roleTitle?: string;
  joinedAt?: string;
  password?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
// CREATE
export type CreateUser = {
  name?: string;
  email: string;
  username?: string;
  phone?: string;
  firstName: string;
  lastName: string;
  roleId?: number;
  password?: string;
};
// EDIT
export type UpdateUser = {
  id: number;
  name?: string;
  email: string;
  username?: string;
  phone?: string;
  firstName: string;
  lastName: string;
  roleId?: number;
  roleTitle?: string;
  joinedAt?: string;
  password?: string;
};
export type SignupResponse = {
  token: string;
  user: loginUser;
};
export type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (data: LoginResponse) => void;
  signUp: (data: SignupResponse) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  isAuthenticated: boolean;
};
