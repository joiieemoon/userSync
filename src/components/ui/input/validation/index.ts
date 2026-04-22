
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