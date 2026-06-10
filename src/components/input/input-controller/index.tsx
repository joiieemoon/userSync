import { forwardRef } from "react";
import type { InputControllerProps } from "../type";

const InputController = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  InputControllerProps
>(
  (
    {
      type = "text",
      label,
      placeholder,
      className = "",
      min,
      max,
      disabled = false,
      error = false,
      rows = 3,
      errorMessage,
      control,
      ...props
    },
    ref,
  ) => {
    const borderClass = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "border-gray-300";

    switch (control) {
      case "input":
        return (
          <div
            className={`flex flex-row gap-2 items-center w-full ${className}`}
          >
            <label
              htmlFor={props.id || props.name}
              className="text-sm font-semibold text-gray-900 whitespace-nowrap"
            >
              {label}
            </label>
            <input
              ref={ref}
              placeholder={placeholder}
              type={type}
              disabled={disabled}
              min={min}
              max={max}
              className={`w-full p-2.5 bg-white border rounded-lg text-sm shadow-xs transition ${borderClass}`}
              {...props}
            />

            {error && (
              <p className="text-xs text-red-500 mt-0.5">{errorMessage}</p>
            )}
          </div>
        );

      case "email":
        return (
          <div className={`flex flex-col gap-1.5 w-full ${className}`}>
            <label
              htmlFor={props.id || props.name}
              className="text-sm font-semibold text-gray-900"
            >
              {label}
            </label>
            <input
              ref={ref}
              placeholder={placeholder}
              type="input"
              disabled={disabled}
              min={min}
              max={max}
              className={`w-full p-2.5 bg-white border rounded-lg text-sm shadow-xs transition ${borderClass}`}
              {...props}
            />
            {error && (
              <p className="text-xs text-red-500 mt-0.5">{errorMessage}</p>
            )}
          </div>
        );

      case "password":
        return (
          <div className={`flex flex-col gap-1.5 w-full ${className}`}>
            <label
              htmlFor={props.id || props.name}
              className="text-sm font-semibold text-gray-900"
            >
              {label}
            </label>
            <input
              ref={ref}
              placeholder={placeholder}
              type="password"
              disabled={disabled}
              min={min}
              max={max}
              className={`w-full p-2.5 bg-white border rounded-lg text-sm shadow-xs transition ${borderClass}`}
              {...props}
            />
            {error && (
              <p className="text-xs text-red-500 mt-0.5">{errorMessage}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div className={`flex flex-col gap-1.5 w-full ${className}`}>
            <label
              htmlFor={props.id || props.name}
              className="text-sm font-semibold text-gray-900"
            >
              {label}
            </label>
            <textarea
              ref={ref}
              rows={rows}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={Number(max)}
              className={`w-full p-2.5 bg-white border rounded-lg text-sm shadow-xs transition ${borderClass}`}
              {...props}
            />
            {error && (
              <p className="text-xs text-red-500 mt-0.5">{errorMessage}</p>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div className={`flex items-center gap-2 py-1 ${className}`}>
            <label
              htmlFor={props.id || props.name}
              className="text-sm font-semibold text-gray-900"
            >
              {label}
            </label>
            <input
              ref={ref}
              type="checkbox"
              disabled={disabled}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              {...props}
            />

            {error && (
              <p className="text-xs text-red-500 ml-1">{errorMessage}</p>
            )}
          </div>
        );
      case "number":
        return (
          <div className={`flex   items-center gap-2 py-1 ${className}`}>
            <label
              htmlFor={props.id || props.name}
              className="text-sm font-semibold text-gray-900"
            >
              {label}
            </label>
            <input
              ref={ref}
              type="number"
              disabled={disabled}
              min={min}
              max={max}
              className="h-7 w-20 p-2 border rounded-lg text-sm shadow-xs   border-gray-300 text-black focus:ring-blue-500 cursor-pointer"
              {...props}
            />

            {error && (
              <p className="text-xs text-red-500 ml-1">{errorMessage}</p>
            )}
          </div>
        );
      case "select":
        return (
          <div className={`flex flex-col gap-1.5 w-full ${className}`}>
            <label
              htmlFor={props.id || props.name}
              className="text-sm font-semibold text-gray-900"
            >
              {label}
            </label>
            <select
              ref={ref}
              disabled={disabled}
              className={`w-full p-2.5 bg-white border rounded-lg text-sm shadow-xs transition cursor-pointer ${borderClass}`}
              {...props}
            >
              {/* <option value="">{props.placeholder || "Select an option working"}</option> */}

              {props.options &&
                props.options.map((opt, index: number) => (
                  <option key={index} value={opt}>
                    {opt}
                  </option>
                ))}

              {props.children}
            </select>

            {error && (
              <p className="text-xs text-red-500 mt-0.5">{errorMessage}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  },
);

InputController.displayName = "InputController";

export default InputController;
