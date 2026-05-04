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
        autoComplete: "username",

    },

    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter password",
        autoComplete: "password"

    },
    {
        name: "cpassword",
        label: "confirm Password",
        type: "password",
        placeholder: "Enter Confirm password",
        autoComplete: "password"
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
        autoComplete: "email",
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter password",
        autoComplete: "password",
    },

];
export const editUserFields: FormField[] = [
    { name: "firstName", label: "First Name", type: "text", placeholder: "Jainil" },
    { name: "lastName", label: "Last Name", type: "text", placeholder: "Kukrolia" },
    { name: "email", label: "Email", type: "email", placeholder: "joiie@yopmail.com" },
    { name: "role", label: "Role", type: "select", placeholder: "" },
];
export const updateFields = [
    { name: "firstName", label: "First Name", type: "text", placeholder: "Jainil" },
    { name: "lastName", label: "Last Name", type: "text", placeholder: "kukrolia" },
    { name: "email", label: "Email Address", type: "text", placeholder: "joiie@yopmail.com" },

];

export const updateuserFiels = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    // { name: "email", label: "Email Address", type: "text" },
    { name: "username", label: "user Name", type: "text" },


];
export const updateRoleFields = [
    { name: "title", label: "Role Name", type: "text" },
    { name: "status", label: "Status", type: "select" },
];
export const updateusersFields = (id: number) => [
    {
        name: "firstName",
        label: "First Name",
        type: "input",
        placeholder: "Jainil",
    },
    {
        name: "lastName",
        label: "Last Name",
        type: "input",
        placeholder: "kukrolia",
    },
    {
        name: "username",
        label: "Username",
        type: "input",
        placeholder: "joiiee",
    },
    {
        name: "email",
        label: "Email",
        type: "input",
        placeholder: "jainilkukrolia@yopmail.com",
    },
    {
        name: "password",
        label: !id ? "Password" : "Reset Password",
        type: "input",
        placeholder: "Enter valid Password",
    },
];