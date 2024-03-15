// import { useQueryClient, useMutation } from "@tanstack/react-query";
// // import { toast } from "react-hot-toast";
// import { createUser } from "../services/apiUser";

// export function useCreateUser() {
//   const queryClient = useQueryClient();

//   const { mutate: createAnotherUser, isLoading: isCreating } = useMutation({
//     mutationFn: createUser,
//     onSuccess: () => {
//       alert("New user succesfully created");
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//     },
//     onError: (err) => alert(err.message),
//   });
//   return { createAnotherUser, isCreating };
// }

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register as signupAPI } from "../services/apiUser";

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { mutate: createUser, isLoading } = useMutation({
    mutationFn: ({ username, email, password }) =>
      signupAPI({ username, email, password }),
    onSuccess: (user) => {
      // console.log(user);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      alert("Account successfully created");
    },
    onError: (err) => {
      alert("Data not valid");
    },
  });

  return { createUser, isLoading };
}
