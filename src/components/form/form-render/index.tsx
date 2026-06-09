import React from "react";
import { useForm, Controller } from "react-hook-form";

import InputController from "../../input/input-controller";
interface FormRendererProps {
  schema: any[];
  OnDeleteField: (id: string) => void;
}

const FormRenderer: React.FC<FormRendererProps> = ({
  schema,
  OnDeleteField,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  console.log(schema, "schemaa");
  const onSubmit = (data: any) => {
    console.log("Form Submitted Successfully Data:", data);
    alert(JSON.stringify(data, null, 2));
    reset();
  };

  if (!schema || schema.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
        No preview available. Add fields
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 bg-white p-6 rounded-xl border border-slate-100 shadow-xs max-w-xl mx-auto"
    >
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">
        Live Form Preview
      </h3>

      {schema.map((field) => {
        const validationRules: any = {};
        if (field.isRequired) {
          validationRules.required = `${field.label} is a required field`;
        }

        return (
          <div key={field.key}>
            {field.control !== "checkbox" ? (
              <div key={field.id} className="w-full flex  items-center gap-2  ">
                <InputController
                  control={field.control}
                  label={field.label}
                  id={field.id}
                  options={field.options}
                  placeholder={field.placeholder}
                  options={field.options}
                  {...register(field.id, validationRules)}
                  error={!!errors[field.id]}
                  errorMessage={errors[field.id]?.message as string}
                />

                <button
                  onClick={() => OnDeleteField(field.id)}
                  className="bg-red-500 cursor-pointer text-white px-2 py-1 rounded text-sm"
                >
                  X
                </button>
              </div>
            ) : (
              <div className="  flex flex-row w-full ">
                <div className="pt-2 flex flex-row items-center gap-2  border-gray-900">
                  <label
                    htmlFor={field.id || name}
                    className="text-sm font-semibold a  pb-0 text-gray-900"
                  >
                    {field.label}
                  </label>
                  <Controller
                    control={control}
                    name={field.id}
                    render={({ field }) => (
                      <InputController
                        id={field.id}
                        control="checkbox"
                        className="text-slate-600  text-sm cursor-pointer"
                        value={field.value}
                        onChange={(e: any) => field.onChange(e.target.checked)}
                        onBlur={field.onBlur}
                        label={field.label}
                      />
                    )}
                  />

                  <button
                    onClick={() => OnDeleteField(field.id)}
                    className="bg-red-500 cursor-pointer text-white px-2 py-1 rounded text-sm"
                  >
                    X
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <button
        type="submit"
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 px-4 rounded-lg shadow-sm transition-all active:scale-[0.99] cursor-pointer"
      >
        Submit Answers
      </button>
    </form>
  );
};

export default FormRenderer;
