import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";


export const useProductDelete = () => {
  return (
    useMutation({
      mutationFn: (id: number) => request.delete(`/category/${id}/`),
      onSuccess: () => {
       
        console.log("O'chirildi");
      },
      onError: () => {
        console.log('xato');
        
      },
    })
  )
  
}
