// service/mutate/usePostCategory.ts
import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { message } from "antd";

export const usePostCategory = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post("/category/", data, { headers: { "Content-Type": "multipart/form-data" } })
        .then((res) => res.data)
        .catch((err) => {
          message.error("Failed to add category: " + err.response?.data?.detail || err.message);
          throw err;
        }),
  });
};
