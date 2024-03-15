import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as login1 } from "../services/apiUser";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ user_email, user_password }) =>
      login1({ user_email, user_password }),
    onSuccess: (data) => {
      // console.log(data.status);
      if (data.status == true) {
        queryClient.setQueryData(["user"], data);
        navigate("/userspage", { replace: true }); //dam erase unde am fost pe pagina
      }
    },
    onError: (err) => {
      console.log("ERROR", err);
      alert("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
