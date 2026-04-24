export type PaginationParams = {
  page: number;
  limit: number;
};
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  roleId: number;
  roleTitle: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};