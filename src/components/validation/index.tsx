import * as yup from "yup";

export const fieldSchema = yup.object({
  controlType: yup.string().required("Field type is required"),

  label: yup.string().trim().required("Field label is required"),

  placeholder: yup.string().nullable(),

  validation: yup.boolean().default(false),

  min: yup
    .number()
    .optional()
    .typeError("Min must be a number")
    .min(0, "Min cannot be negative"),

  max: yup
    .number()
    .typeError("Max must be a number")
    .test(
      "max-greater-than-min",
      "Max must be greater than Min",
      function (value: number | string) {
        const { min } = this.parent;

        if (value === undefined || value === null) return true;

        return value >= min;
      },
    ),
});
export const createDynamicSchema = (dynamicFields: any[]) => {
  const shape: any = {};

  dynamicFields.forEach((field) => {
    let validator: any = yup.string();

    if (field.control === "number") {
      validator = yup
        .number()
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : value,
        )
        .typeError(`${field.label} must be a number`);
    } else if (field.control === "email") {
      validator = yup.string().email("Invalid email format");
    }

    if (field.isRequired || field.validation) {
      if (field.control === "checkbox") {
        validator = validator.oneOf([true], `${field.label} must be checked`);
      } else {
        validator = validator.required(`${field.label} is required`);
      }
    } else {
      validator = validator.nullable().optional();
    }

    if (
      field.min !== undefined &&
      field.min !== null &&
      field.min !== "" &&
      field.min !== 0
    ) {
      if (field.control === "number") {
        validator = validator.min(
          Number(field.min),
          `${field.label} must be at least ${field.min}`,
        );
      } else if (field.control !== "checkbox") {
        validator = validator.min(
          Number(field.min),
          `${field.label} must be at least ${field.min} characters`,
        );
      }
    }

    if (
      field.max !== undefined &&
      field.max !== null &&
      field.max !== "" &&
      field.max !== 0
    ) {
      if (field.control === "number") {
        validator = validator.max(
          Number(field.max),
          `${field.label} cannot exceed ${field.max}`,
        );
      } else if (field.control !== "checkbox") {
        validator = validator.max(
          Number(field.max),
          `${field.label} cannot exceed ${field.max} characters`,
        );
      }
    }

    shape[field.id] = validator;
  });

  return yup.object().shape(shape);
};
