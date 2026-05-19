
import { errorMessage } from "./error-message";

import { z } from "zod";

import 'yup-phone-lite';
import { PermissionFlags, AccessMap } from "../../../../features/roles/types";
const letterRegx = /^[A-Za-z]+$/;
export type loginPropsform = z.infer<typeof loginvalidationSchema>
export const loginvalidationSchema = z.object({

    email: z.string().nonempty(errorMessage.required).email(errorMessage.email),
    password: z
        .string().nonempty(errorMessage.required)

        .min(8, errorMessage.passwordMin)
        .regex(/[A-Z]/, errorMessage.passwordUpper)
        .regex(/[a-z]/, errorMessage.passwordLower)
        .regex(/[0-9]/, errorMessage.passwordNumber)
        .regex(/[@$!%*?&]/, errorMessage.passwordSpecial),
})

export type SignupPropsform = z.infer<typeof signupvalidationSchema>;
export const signupvalidationSchema = z
    .object({
        firstName: z.string().nonempty(errorMessage.required)
            .regex(letterRegx, errorMessage.letter),

        lastName: z.string().nonempty(errorMessage.required)
            .regex(letterRegx, errorMessage.letter)
        ,

        email: z.string()
            .nonempty(errorMessage.required)
            .email(errorMessage.email)
        ,

        password: z.string()
            .nonempty(errorMessage.required)
            .min(8, errorMessage.passwordMin)
            .regex(/[A-Z]/, errorMessage.passwordUpper)
            .regex(/[a-z]/, errorMessage.passwordLower)
            .regex(/[0-9]/, errorMessage.passwordNumber)
            .regex(/[@$!%*?&]/, errorMessage.passwordSpecial),

        cpassword: z.string()
            .nonempty(errorMessage.required),

        username: z.string()
            .nonempty(errorMessage.required).min(3, errorMessage.minLengthuser),
        phone: z.string().nonempty(errorMessage.required),
    })
    .refine((data) => data.password === data.cpassword, {
        message: errorMessage.passwordMatch,
        path: ["cpassword"],
    });


export type updateprofileProps = z.infer<typeof updateprofilevaldiation>
export const updateprofilevaldiation = z.object({
    firstName: z.string().nonempty(errorMessage.required).regex(letterRegx, errorMessage.letter),
    lastName: z.string().nonempty(errorMessage.required).regex(letterRegx, errorMessage.letter),
    email: z.string().nonempty(errorMessage.email).email(errorMessage.email),
    phone: z.string().nonempty(errorMessage.required),
})

export type updateUserformProps = z.infer<typeof updateUserValidation>;
export const updateUserValidation = z.object({
    firstName: z
        .string().nonempty(errorMessage.required)
        .regex(letterRegx, errorMessage.letter),


    lastName: z
        .string()
        .regex(letterRegx, errorMessage.letter)
        .nonempty(errorMessage.required),

    email: z
        .string()
        .email(errorMessage.email)
        .nonempty(errorMessage.email),

    phone: z
        .string()
        .nonempty(errorMessage.required),

    roleId: z
        .string()
        .nonempty("Role is required"),
    username: z.string().nonempty(errorMessage.required),
    password: z.string().optional().refine((value) => {
        if (!value) return true; // allow empty
        return value.length >= 6;
    }, {
        message: "Password must be at least 6 characters",

    }),
    isActive: z.string(),

});
export const roleValidationSchema = z.object({
    title: z
        .string()
        .nonempty("Role name is required")
        .min(2, "Role name must be at least 2 characters")
    ,

    status: z
        .enum(["active", "inactive"])
        .refine((val) => val !== undefined && val !== null, {
            message: "Status is required",
        }),
    permissions: z
        .custom<AccessMap>()
        .refine(
            (value) => {
                if (!value) return false;

                return (Object.values(value) as PermissionFlags[]).some((module) =>
                    Object.values(module).some(Boolean)
                );
            },
            {
                message: "At least one permission must be selected",
            }
        )


});