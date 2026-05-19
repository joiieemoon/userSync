
import Input from "../input-fields";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

// export interface InputControllerProps
//     extends React.ComponentProps<typeof Input> {
//     control: "input" | "textarea" | "select" | "checkbox" | string;
//     registration?: UseFormRegisterReturn;

//     // 🔥 error handling
//     error?: boolean;
//     errorMessage?: string | FieldError;

// }


export interface InputControllerProps
    extends React.ComponentProps<typeof Input> {
    control: "input" | "textarea" | "select" | "checkbox" |string;

    registration?: UseFormRegisterReturn;

    error?: boolean;
    errorMessage?: string;
}
export interface InputProps {
    type?: "text" | "number" | "email" | "password" | "date" | "time" | string;

    id?: string;
    name?: string;
    placeholder?: string;
    registration?: UseFormRegisterReturn;
    value?: string | number;

    onChange?: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;

    onBlur?: React.FocusEventHandler<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >;

    onFocus?: React.FocusEventHandler<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >;

    onKeyDown?: React.KeyboardEventHandler<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >;

    className?: string;
    min?: string |number;
    max?: string | number;
    step?: number;
    disabled?: boolean;
    success?: boolean;
    error?: boolean;
    hint?: string;
    rows?: number;

    label?: string;

    errorMessage?: string;
    autoComplete?: string;

    children?: React.ReactNode;

    as?: "input" | "textarea" | "select";
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
    // onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    errorMessage?: string;
    autoComplete?: string,
    children?: React.ReactNode;
    onFocus?: React.FocusEventHandler<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    }
export interface FormField {
    email?: string,
    name?: string,
    label?: string,
    type?: "text" | "area" | "password" | "" | string,
    placeholder?: string,
    autoComplete?: string,

}   