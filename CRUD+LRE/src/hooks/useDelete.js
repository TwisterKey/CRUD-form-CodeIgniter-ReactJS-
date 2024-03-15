import { useQueryClient, useMutation } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
import { deleteUser as deleteThisUser } from "../services/apiUser";

export function useDelete() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: (id) => deleteThisUser(id),
    onSuccess: () => {
      alert("User succesfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return { isDeleting, deleteUser };
}
