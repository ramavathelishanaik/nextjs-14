'use client';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import apiEndPoints from '../../../../services/apiEndPoints';

export const useChangePassword = (setRedirect) => {
  const router = useRouter();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}${apiEndPoints.CHANGE_PASSWORD}`;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const {
    mutate: changePassword,
    data,
    isLoading,
    isPending,
    isSuccess,
    error,
    isError,
  } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        apiUrl,
        {
          old_password: data?.old_password,
          new_password: data?.new_password,
        },
        config
      );
      return response;
    },
    onSuccess: (response) => {
      const data = response?.data;
      toast.success(data?.message);
      setRedirect(true);

      setTimeout(()=>{
        router.back();
      setRedirect(false);


      },2000)

    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error,'err')
      toast.error(error?.response?.data?.message?.msg);
      setRedirect(false);
    },
  });
  return {
    changePassword,
    data,
    isLoading,
    isPending,
    isSuccess,
    error,
    isError,
  };
};
