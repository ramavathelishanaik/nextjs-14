'use client';
import axios from 'axios';
import {  useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import apiEndPoints from '../../../../services/apiEndPoints';

export const useResetPassword = () => {
  const router = useRouter();
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}${apiEndPoints.FORGOT_PASSWORD}`;
  const config = 'null';

  const {
    mutate: resetPassword,
    data,
    isLoading,
    isPending,
    isSuccess
  } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.put(
        apiUrl,
        { user_id: data?.user_id, new_password: data?.new_password },
        config
      );
      return response;
    },
    onSuccess: (response) => {
      const data = response?.data;
      toast.success(data?.message);
      router.push('/auth/login')
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
  return { resetPassword, data, isLoading, isPending,isSuccess };
};
