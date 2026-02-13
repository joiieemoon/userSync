export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "file"; // add file type
  placeholder?: string;
  accept?: string; 
}
