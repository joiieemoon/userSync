import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import InputController from "../../input/input-controller";
import { yupResolver } from "@hookform/resolvers/yup";
import { createDynamicSchema } from "../../validation";
import { useEffect } from "react";

interface FormRendererProps {
  schema: Array<Record<string, unknown>>;
  OnDeleteField: (id: string) => void;
}

const FormRenderer: React.FC<FormRendererProps> = ({
  schema,
  OnDeleteField,
}) => {
  const defaultValues = useMemo(() => {
    const values: Record<string, string> = {};
    schema.forEach((field) => {
      values[field.id as string] = "";
    });
    return values;
  }, [schema]);

  const dynamicYupSchema = useMemo(() => {
    return createDynamicSchema(schema);
  }, [schema]);

  const {
    formState,
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues,
    resolver: yupResolver(dynamicYupSchema),
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = (data: Record<string, unknown>) => {
    console.log("Form Submitted Successfully Data:", data);
    alert(JSON.stringify(data, null, 2));
    reset(defaultValues);
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
        const id = field.id as string;

        const showError =
          !!errors[id] && (touchedFields[id] || formState.isSubmitted);
        return (
          <div key={field.id as string}>
            {field.control !== "checkbox" ? (
              <div className="w-full flex items-center gap-2">
                {(field.isRequired as boolean) && (
                  <p className="text-red-600">* </p>
                )}
                <InputController
                  control={field.control as string}
                  label={field.label as string}
                  placeholder={field.placeholder as string}
                  options={
                    field.options as Array<{ label: string; value: string }>
                  }
                  {...register(field.id as string)}
                  error={showError}
                  errorMessage={errors[field.id as string]?.message as string}
                />

                <button
                  type="button"
                  onClick={() => OnDeleteField(field.id as string)}
                  className="bg-red-500 cursor-pointer text-white px-2 py-1 rounded text-sm h-fit self-end mb-2"
                >
                  X
                </button>
              </div>
            ) : (
              <div className="flex flex-row w-full">
                {(field.isRequired as boolean) && (
                  <p className="text-red-600">*</p>
                )}
                <InputController
                  control="checkbox"
                  label={field.label as string}
                  className="text-slate-600 text-sm cursor-pointer"
                  {...register(field.id as string)}
                  error={!!errors[field.id as string]}
                  errorMessage={errors[field.id as string]?.message as string}
                />

                <button
                  type="button"
                  onClick={() => OnDeleteField(field.id as string)}
                  className="bg-red-500 cursor-pointer text-white px-2 py-1 rounded text-sm ml-3"
                >
                  X
                </button>
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
