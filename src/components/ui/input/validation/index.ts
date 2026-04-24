
import { errorMessage } from "./error-message";
import * as yup from "yup";
import 'yup-phone-lite';
const letterRegx = /^[A-Za-z]+$/;
export const loginvalidationSchema = yup.object().shape({
    email: yup.string().email(errorMessage.email).required(errorMessage.email),
    password: yup
        .string()
        .required(errorMessage.required)
        .min(8, errorMessage.passwordMin)
        .matches(/[A-Z]/, errorMessage.passwordUpper)
        .matches(/[a-z]/, errorMessage.passwordLower)
        .matches(/[0-9]/, errorMessage.passwordNumber)
        .matches(/[@$!%*?&]/, errorMessage.passwordSpecial),
})
export const signupvalidationSchema = yup.object().shape({

    firstName: yup.string().matches(letterRegx, errorMessage.letter).required(errorMessage.required),
    lastName: yup.string().matches(letterRegx, errorMessage.letter).required(errorMessage.required),
    email: yup.string().email(errorMessage.email).required(errorMessage.email),
    password: yup
        .string()
        .required(errorMessage.required)
        .min(8, errorMessage.passwordMin)
        .matches(/[A-Z]/, errorMessage.passwordUpper)
        .matches(/[a-z]/, errorMessage.passwordLower)
        .matches(/[0-9]/, errorMessage.passwordNumber)
        .matches(/[@$!%*?&]/, errorMessage.passwordSpecial),
    username: yup.string().required(errorMessage.required),
    phone: yup.string().required(errorMessage.required),


})

export const updateprofilevaldiation = yup.object().shape({
    firstName: yup.string().matches(letterRegx, errorMessage.letter).required(errorMessage.required),
    lastName: yup.string().matches(letterRegx, errorMessage.letter).required(errorMessage.required),
    email: yup.string().email(errorMessage.email).required(errorMessage.email),
    phone: yup.string().required(errorMessage.required),
})
import * as yup from "yup";

export const updateUserValidation = yup.object().shape({
    firstName: yup
        .string()
        .matches(letterRegx, errorMessage.letter)
        .required(errorMessage.required),

    lastName: yup
        .string()
        .matches(letterRegx, errorMessage.letter)
        .required(errorMessage.required),

    email: yup
        .string()
        .email(errorMessage.email)
        .required(errorMessage.email),

    phone: yup
        .string()
        .required(errorMessage.required),

    roleId: yup
        .number()
        .required("Role is required"),

    password: yup.string().when([], {
        is: () => true,
        then: (schema) =>
            schema.test(
                "password-check",
                "Password must be at least 6 characters",
                (value) => {
                    if (!value) return true; // empty allowed (update case)
                    return value.length >= 6;
                }
            ),
    }),
});
export const roleValidationSchema = yup.object().shape({
    title: yup
        .string()
        .required("Role name is required")
        .min(2, "Role name must be at least 2 characters")
    ,

    status: yup
        .string()
        .oneOf(["active", "inactive"], "Invalid status")
        .required("Status is required"),

    permissions: yup
        .object()
        .test(
            "permissions-required",
            "At least one permission must be selected",
            (value) => {
                if (!value) return false;

                return Object.values(value).some((module: any) =>
                    Object.values(module || {}).some(Boolean)
                );
            }
        ),
});