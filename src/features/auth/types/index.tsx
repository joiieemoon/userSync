export type loginProps = {
  email: string;
  password: string;
};
export type LoginResponse = {
  token: string;
  user: User;
};
export type SignupProps = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phone: string;
};
export type User = {
  id: string;
  name?: string;
  email: string;
  username?: string;
  phone?: string;
  firstName: string;
  lastName: string;
};
export type SignupResponse = {
  token: string;
  user: User;
};
export type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (data: LoginResponse) => void;
  signUp: (data: SignupResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
};
