import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request"; 

export const useProductDelete = () => {
  return useMutation({
    mutationFn: (id: number) => request.delete(`/category/${id}/`), 

    onSuccess: (data) => {
      console.log("Category deleted successfully:", data);
    },

    onError: (error) => {
      console.error("Failed to delete category:", error);
    },
  });
};
