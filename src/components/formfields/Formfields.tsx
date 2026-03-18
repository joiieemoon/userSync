import React, { useState } from "react";
import type { FC } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?:
    | "text"
    | "number"
    | "email"
    | "password"
    | "time"
    | "textarea"
    | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  className?: string;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  label?: string;
  errorMessage?: string;
  as?: "input" | "textarea" | "select";
  rows?: number;
};

const Inputfields: FC<InputProps> = ({
  type = "text",
  id,
  errorMessage,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  className = "",
  disabled = false,
  success = false,
  error = false,
  label,
  required,
  as = "input",
  rows = 4,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  let inputClasses = `h-11 w-full rounded-lg text-black border px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-3 ${className}`;

  if (disabled) {
    inputClasses += ` bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed`;
  } else if (error) {
    inputClasses += ` border-red-500 focus:border-red-400 focus:ring-red-200`;
  } else if (success) {
    inputClasses += ` border-green-500 focus:border-green-400 focus:ring-green-200`;
  } else {
    inputClasses += ` border-gray-300 focus:border-blue-400`;
  }

  const renderField = () => {
    switch (as) {
      case "select":
        return (
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={inputClasses}
            {...rest}
          >
            {rest.children}
          </select>
        );

      case "textarea":
        return (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
            {...rest}
          />
        );

      case "input":
      default:
        return (
          <div className="relative">
            <input
              type={isPassword ? (showPassword ? "text" : "password") : type}
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              className={inputClasses}
              required={required}
              {...rest}
            />

            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[22px] -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <HiEye size={18} /> : <HiEyeOff size={18} />}
              </button>
            )}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="mb-1 text-black text-sm font-medium">
          {label}
        </label>
      )}

      {renderField()}

      {error && errorMessage && (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Inputfields;
