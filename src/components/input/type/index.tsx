import type { ReactElement } from "react";

export interface InputControllerProps {
  control: "input" | "textarea" | "checkbox" | "select" | string;
  type?: string;
  label?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: any;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  options?: string[] | { label: string; value: string }[];
  rows?: number;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  min?: number;
  max?: number;
  children?: React.ReactNode;
}
