import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editUser as EditThisUser } from "../services/apiUser";

export function useEdit() {
  const queryClient = useQueryClient();
  const { mutate: editUser, isLoading: isEditing } = useMutation({
    mutationFn: ({ newUserData, user_id }) =>
      EditThisUser({ newUserData, user_id }),
    onSuccess: () => {
      alert("User succesfully edited");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { editUser, isEditing };
}
