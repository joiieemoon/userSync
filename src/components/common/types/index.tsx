export type PaginationParams = {
  page: number;
  limit: number;
  search?: string;
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
export interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; 
  desc?: string; 
}
export interface BreadcrumbProps {
  pageTitle: string;
}

export type CommanPaginationProps = {
  page: number;
  totalPages: number;
  limit: number;
   totaluser?:number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
 
};
