import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useAuth } from "../useAuth";
import { loginApi, signupApi } from "../../services/auth-api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getrolebyidApi } from "../../../roles/service";
import { setPermissions } from "../../../../redux/slice";
import { formatPermissionsForUI } from "../../../../lib/helper/flate-permission";

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
export const usePermission = (id: number) => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["permission", id],
    queryFn: () => getrolebyidApi(id),
    enabled: !!id,

    onSuccess: (data) => {
      console.log("use permisson fetch", data);
      // dispatch(setPermissions(data));
      dispatch(
        setPermissions({
          role: data.role,
          permissions: formatPermissionsForUI(data.permissions),
        }),
      );
    },
  });
};
