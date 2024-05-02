'use client';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import apiEndPoints from '../../../services/apiEndPoints';
import { toggleSessionExpired } from '../../../store/slices/auth';

export const useSignout = () => {
    
  const dispatch = useDispatch();
  const router = useRouter();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}${apiEndPoints.USER_LOGOUT}`;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const {
    mutate: signOutMutate,
    data,
    isLoading,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(apiUrl, {}, config);
      return response;
    },
    onSuccess: (response) => {
      const data = response?.data;
      if (data?.message === 'Logged out') {
        localStorage.clear();
        toast.success('Logout successfully.');
      }
      signOut({
        redirect: true,
        callbackUrl: '/auth/login',
      });
    },
    onError: (error) => {
      if(error?.response?.status === 401){
      toast.error(error?.response?.data?.detail);
      dispatch(toggleSessionExpired(true));

        router.push('/auth/login');
        return
      }
     
      toast.error(error?.response?.data?.detail);
    },
  });
  return { signOutMutate, data, isLoading, isPending };
};
