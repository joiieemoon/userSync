export interface InputControllerProps {
  control:
    | "input"
    | "textarea"
    | "checkbox"
    | "select"
    | "number"
    | (string & {});
  type?: string;
  label?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number | boolean | null;
  isTouched?: boolean;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;

  options?: { label: string; value: string }[];
  rows?: number;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  min?: number | string;
  max?: number | string;
  children?: React.ReactNode;
}

export type ControlType =
  | "input"
  | "email"
  | "password"
  | "textarea"
  | "checkbox"
  | "number"
  | "select";

export interface FieldInputData {
  controlType: ControlType;
  label: string;
  placeholder?: string;
  validation?: boolean;
  min?: number;
  max?: number;
  options?: string[];
}
export interface SidebarProps {
  onAddField: (data: FieldInputData) => void;
}

export interface SchemaField {
  id: string;
  control: ControlType;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  min?: number;
  max?: number;
  options?: string[];
}
export interface DynamicField {
  id: string;
  control: ControlType;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  validation?: boolean;
  min?: number;
  max?: number;
  options?: string[];
}
