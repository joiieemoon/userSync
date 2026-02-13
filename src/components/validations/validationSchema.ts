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
        .min(4  , errorMessage.passwordMin)
        .matches(/[A-Z]/, errorMessage.passwordUpper)
        .matches(/[a-z]/, errorMessage.passwordLower)
        .matches(/[0-9]/, errorMessage.passwordNumber)
        .matches(/[@$!%*?&]/, errorMessage.passwordSpecial),

    confirmPassword: yup
        .string()
        .required(errorMessage.required)
        .oneOf([yup.ref("password"), null], errorMessage.cpasswordmatch),
    profilePhoto: yup.mixed().required(errorMessage.img),

})