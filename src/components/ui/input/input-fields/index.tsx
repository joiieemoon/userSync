import type { FC } from "react";
import type { InputProps } from "../types";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../../../assets/icons";
// import Label from "../../../form/Label";/
const Input: FC<InputProps> = ({
  type = "text",
  label,
  id,
  as = "input",
  name,
  placeholder,
  value,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
  onBlur,
  rows = 3,
  errorMessage,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  let inputClasses = ` h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
  } else if (error) {
    inputClasses += `  border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  } else if (success) {
    inputClasses += `  border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800`;
  }

  const inputType = () => {
    switch (as) {
      case "select":
        return (
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onblur}
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
            onBlur={onblur}
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
          <>
            <div className="relative mt-3">
              <label
                htmlFor={name}
                className={clsx(
                  twMerge(
                    "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400",
                    className,
                  ),
                )}
              >
                {label}
              </label>
              <input
                // type={type}
                type={isPassword ? (showPassword ? "text" : "password") : type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                className={inputClasses}
                onBlur={onBlur}
              />

              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 mt-3"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  )}
                </button>
              )}
              {hint && (
                <p
                  className={`mt-1.5 text-xs ${
                    error
                      ? "text-error-500"
                      : success
                        ? "text-success-500"
                        : "text-gray-500"
                  }`}
                >
                  {hint}
                </p>
              )}
            </div>
          </>
        );
    }
  };

  return (
    <div className="relative">
      {inputType()}

      {error && errorMessage && (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
