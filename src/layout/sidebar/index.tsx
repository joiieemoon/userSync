import { useState } from "react";
import InputController from "../../components/input/input-controller";

import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fieldSchema } from "../../components/validation";

import type { SidebarProps, FieldInputData } from "../../components/input/type";

const defaultValues = {
  controlType: "input",
  label: "",
  placeholder: "",
  validation: false,
  min: 0,
  max: 0,
};
const Sidebar: React.FC<SidebarProps> = ({ onAddField }) => {
  const {
    register,
    handleSubmit,

    resetField,
    control,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(fieldSchema) });

  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState<string>("");
  const handleFormSubmit = (data: FieldInputData) => {
    console.log(data, "dadsad data");

    const payload = {
      ...data,
      options: data.controlType === "select" ? options : [],
    };

    onAddField(payload);
    resetField("label");
    resetField("placeholder");
    resetField("controlType");
    resetField("validation");
    resetField("min");
    resetField("max");

    setOptions([]);
  };
  const removeOption = (item: string) => {
    setOptions((prev) => {
      return prev.filter((i) => i !== item);
    });
  };
  const controlType = useWatch({ control, name: "controlType" });
  const handleAddoption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption.trim()]);
      setNewOption("");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className=" bg-white border-r border-slate-200 p-6 flex flex-col justify-between shadow-sm">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-xl font-bold text-slate-800 ">
                Form Builder
              </h1>
            </div>

            <div className="space-y-4">
              <div>
                <InputController
                  control="input"
                  label="Field Label"
                  placeholder="e.g., Enter Username"
                  error={!!errors.label}
                  errorMessage={errors.label?.message}
                  className="w-full text-sm text-slate-700 "
                  {...register("label")}
                />
              </div>
              {controlType !== "select" && controlType !== "checkbox" && (
                <div className="pt-2 flex items-center justify-between  border-gray-900">
                  <InputController
                    control="input"
                    label="Place Holder: "
                    placeholder="Place holder"
                    className="text-slate-600 text-sm cursor-pointer"
                    {...register("placeholder")}
                  />
                </div>
              )}
              <div>
                <InputController
                  control="select"
                  label="Field Type"
                  className="w-full text-sm text-slate-700"
                  {...register("controlType")}
                >
                  <option value="input">Text Input</option>
                  <option value="email">Email Input</option>
                  <option value="password">Password Input</option>
                  <option value="select">Dropdown Select</option>
                  <option value="textarea">Textarea</option>
                  <option value="checkbox">Checkbox</option>
                </InputController>
              </div>

              {controlType === "select" && (
                <>
                  <div className="p-3 bg-slate-50 border rounded-lg space-y-2">
                    <span className="text-xs font-semibold text-slate-700 block">
                      Add Dropdown Options
                    </span>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        placeholder="e.g., Male"
                        className="flex-1 text-sm p-2 border rounded text-black"
                      />
                      <button
                        type="button"
                        onClick={handleAddoption}
                        className="px-3 py-1 bg-blue-600 text-black rounded text-sm font-medium"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {options.map((item) => {
                    return (
                      <div key={item} className="inline-block mr-2 mb-2">
                        <span className="bg-gray-200 border rounded-2xl p-2 text-black border-2 border-blue-800">
                          {item}
                          <button
                            type="button"
                            onClick={() => removeOption(item)}
                            className="bg-blue-200 rounded-full  p-1 m-2 cursor-pointer"
                          >
                            X
                          </button>
                        </span>
                      </div>
                    );
                  })}
                </>
              )}

              <div className="pt-2 flex items-center justify-between border-gray-900">
                <InputController
                  control="checkbox"
                  label="Mark as Required field:"
                  className="text-slate-600 text-sm cursor-pointer"
                  {...register("validation")}
                />
              </div>

              {controlType !== "select" && controlType !== "checkbox" && (
                <div className="flex items-center gap-6">
                  <InputController
                    control="number"
                    label="Min"
                    error={!!errors.min}
                    errorMessage={errors.min?.message}
                    {...register("min")}
                  />

                  <InputController
                    control="number"
                    label="Max"
                    error={!!errors.max}
                    errorMessage={errors.max?.message}
                    {...register("max")}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="pt-4  border-slate-100">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white bg-blue-600 shadow-sm hover:bg-blue-700 active:bg-blue-800 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Field
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Sidebar;
