import { useQuery } from "@tanstack/react-query";
import { showAllUsers } from "../services/apiUser";

export default function useShowAllUsers() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => showAllUsers(),
    onSuccess: (data) => {
      console.log("Utilizatori obținuți cu succes:", data);
    },
    onError: (error) => {
      console.error("Eroare la obținerea utilizatorilor:", error);
    },
  });
  //   console.log(isLoading);
  return { users: data, isLoading, isError };
}
