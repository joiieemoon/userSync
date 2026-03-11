import * as yup from "yup";
import { errorMessage } from "./errorMessage";

const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const letterRegx = /^[A-Za-z]+$/;

export const loginvalidationSchema = yup.object().shape({
  email: yup.string().email(errorMessage.email).required(errorMessage.email),
  password: yup.string().matches(passwordRegx, errorMessage.passwordStrength).required(errorMessage.password)
})

export const signupvalidationSchema = yup.object().shape({

  firstName: yup.string().matches(letterRegx, errorMessage.letter).required(errorMessage.required),
  lastName: yup.string().matches(letterRegx, errorMessage.letter).required(errorMessage.required),
  email: yup.string().email(errorMessage.email).required(errorMessage.email),
  password: yup
    .string()
    .required(errorMessage.required)
    .min(4, errorMessage.passwordMin)
    .matches(/[A-Z]/, errorMessage.passwordUpper)
    .matches(/[a-z]/, errorMessage.passwordLower)
    .matches(/[0-9]/, errorMessage.passwordNumber)
    .matches(/[@$!%*?&]/, errorMessage.passwordSpecial),

  confirmPassword: yup
    .string()
    .required(errorMessage.required)
    .oneOf([yup.ref("password"), null], errorMessage.cpasswordmatch),


})
export const updateProfileValidationSchema = yup.object().shape({
  firstName: yup.string().matches(letterRegx, errorMessage.letter).required(errorMessage.required),
  lastName: yup.string().matches(letterRegx, errorMessage.letter).required(errorMessage.required),
  email: yup.string().email(errorMessage.email).required(errorMessage.email),

  phone: yup
    .string()
    .optional()
    .test("len", "Phone must be exactly 10 digits", (val) => !val || val.length === 10),

  role: yup
    .string()
    .optional()
    .matches(/^[A-Za-z\s]*$/, errorMessage.letter)
    .max(20, "Role can be at most 20 characters"),

  bio: yup.string().optional().max(200, "Bio can be at most 200 characters"),

  profilePhoto: yup
    .mixed()
    .test("fileSize", "File size is too large", (value) => {
      if (!value) return true; 
      return value.size <1 * 1024 * 1024; // 2MB limit
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      if (!value) return true;
      return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
    })
});

