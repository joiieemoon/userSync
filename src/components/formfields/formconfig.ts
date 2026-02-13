  // formconfig.ts

  // import { FormField } from "../../../components/formfields/formtypes";
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
      type: "email",
      placeholder: "name@flowbite.com",
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
    { name: "profilePhoto",
      label: "Profile Photo", 
      type: "file", 
      accept: "image/*" 
      },
  ];

  export const loginFields: FormField[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "name@flowbite.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
    },
  ];
