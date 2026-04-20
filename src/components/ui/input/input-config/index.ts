import { FormField } from "../types";
export const signupFields: FormField[] = [
    {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "Jainil",
    },
    {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "kukrolia",
    },
    {
        name: "email",
        label: "Email",
        type: "text",
        placeholder: "joiie@yopmail.com",
    },

    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter password",
    },
    {
        name: "username",
        label: "User Name",
        type: "text",
        placeholder: "Enter User Name",
    },
   


];

export const loginFields: FormField[] = [
    {
        name: "email",
        label: "Email",
        type: "text",
        placeholder: "name@yopmail.com",
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter password",
    },

];
export const editUserFields: FormField[] = [
    { name: "firstName", label: "First Name", type: "text", placeholder: "Jainil" },
    { name: "lastName", label: "Last Name", type: "text", placeholder: "Kukrolia" },
    { name: "email", label: "Email", type: "email", placeholder: "joiie@yopmail.com" },
    { name: "role", label: "Role", type: "select", placeholder: "" },
];