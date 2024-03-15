import { useMutation } from "@tanstack/react-query";
import { register as signupAPI } from "../services/apiUser";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ username, email, password }) =>
      signupAPI({ username, email, password }),
    onSuccess: (user) => {
      // console.log(user);
      alert("Account successfully created!");
    },
  });

  return { signup, isLoading };
}
