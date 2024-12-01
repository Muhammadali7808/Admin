import { useMutation } from '@tanstack/react-query';
import { request } from '../../../config/request';
import Cookies from 'js-cookie';
export const usLoginPost = () => {
  return (
    useMutation({
      mutationFn: (data) => request.post("/api/admin-login/", data).then((res) => res.data
      ),
      onSuccess: (res) => {
        Cookies.set("accessToken", res?.data?.token)
      },
    })
  )
}

