
import type { FormField } from "./formtypes";
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
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Re-enter password",
  },

];

export const loginFields: FormField[] = [
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "name@flowbite.com",
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