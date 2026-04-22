import { useMutation } from "@tanstack/react-query";

import { useAuth } from "../useAuth";
import { loginApi, signupApi } from "../../services/auth-api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const useLogin = () => {
  const { login } = useAuth();
  const navigation = useNavigate();
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login({
        token: data.token,
        user: data.user,
      });
      console.log("user login succesfull");

      navigation("/", { replace: true });
    },
    onError: (err) => {
      console.log(err.message);
    },
  });
};
export const useSignUp = () => {
  const { signUp } = useAuth();
  const navigation = useNavigate();
  return useMutation({
    mutationFn: signupApi,

    onSuccess: (response) => {
      console.log("SIGNUP RESPONSE:", response);
      navigation("/", { replace: true });
    

      signUp({
        token: response.token,
        user: response.user,
      });

      toast.success("User Signup successfully");
    },
  });
};
