
import Input from "../input-fields";
export interface InputControllerProps
    extends React.ComponentProps<typeof Input> {
    control: "input" | "textarea" | "select" | "checkbox" | string;
}
export interface InputProps {
    type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string | number;
    // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChange?: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    className?: string;
    min?: string;
    max?: string;
    step?: number;
    disabled?: boolean;
    success?: boolean;
    error?: boolean;
    hint?: string;
    rows?: number;
    as?: string;
    label?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    errorMessage?: string;
    autoComplete?: string,
    children?: React.ReactNode;
}
export interface FormField {
    email?: string,
    name?: string,
    label?: string,
    type?: "text" | "area" | "password" | "" | string,
    placeholder?: string,
    autoComplete?: string,

} 