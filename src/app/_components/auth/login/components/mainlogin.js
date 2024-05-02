'use client';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Checkbox } from '@mantine/core';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { toggleSessionExpired } from '../../../../store/slices/auth.js';
import PrimaryButton from '../../../../common/primary_button/index.js';
import loginimg from '../../../../../public/assets/images/loginImg.png';
import eyeOpen from '../../../../../public/assets/icons/eyeOpen.svg';
import eyeClose from '../../../../../public/assets/icons/eyeClose.svg';

export default function MainLoginPage() {
  const dispatch = useDispatch();

  //invoking the react hook form
  const { register, handleSubmit, formState, setError, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [signinLoading, setSigninLoading] = useState(false);
  const [showpassword, setShowpassword] = useState(false);

  //to meet the floting email and password labels we watching these fields and giving styling conditionally
  const emailField = watch('email');
  const passwordField = watch('password');

  //invoking few formState properties to show errors and checking if the form is submitted successfully without any errors
  const { errors } = formState;

  // helper function to show field error messages
  const showErrormsg = (errors, name) => {
    if (!errors[name]) {
      return null;
    }
    return (
      <p className='text-red-700 text-sm font-medium'>{errors[name].message}</p>
    );
  };

  //form submit function
  const onSubmit = (data) => {
    setSigninLoading(true);

    signIn('user-login', {
      email: data.email,
      password: data.password,
      re_login: true,
      redirect: false,
    })
      .then((res) => {
        if (res.error) {
          if (res.error.startsWith('Cannot read properties of undefined')) {
            // ErrorToast({ text: 'Something went wrong' });
            toast.error('Something went wrong');
            return;
          }
          const errData = JSON.parse(res.error);
          if (errData?.message.password) {
            setError('password', { message: 'Password is incorrect' });
          } else if (errData?.message.email) {
            setError('email', { message: 'Email is incorrect' });
          }
          // if (errData?.message === 'user have active session') {
          //   open active session tab
          // }
          // if (errData?.message !== 'user have active session') {
          //   throw error
          // }
        } else {
          setSigninLoading(false);
        }
      })
      .catch((err) => {
        if (err?.response?.data) {
          // ErrorToast({ text: 'Something went wrong' });
          toast.error('Something went wrong');
        } else {
          return null;
        }
      })
      .finally(() => {
        setSigninLoading(false);
        dispatch(toggleSessionExpired(false));
      });
  };

  //reseting the form after form submitting without any errors
  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [isSubmitSuccessful]);

  return (
    <div className='h-screen  font-ttnorms p-4 mobile:p-6 mobile-xl:p-8 md:p-0 md:flex md:justify-center md:gap-x-8 lg:gap-x-12 xl:gap-x-16 3xl:gap-x-20 md:items-center md:px-12 md:relative'>
      {/* title div started */}
      <div className='hidden  md:absolute md:top-14 lg:top-16 xl:top-16 2xl:top-32  md:flex md:justify-center'>
        <h1 className='text-primary-login text-2xl lg:text-[28px] font-bold'>
          RetailSense
        </h1>
      </div>
      {/* title div end */}
      {/* image div started */}
      <div className='md:w-1/2  md:flex md:justify-end'>
        <div className='md:hidden'>
          <h1 className='font-bold text-3xl mobile-xl:text-4xl text-primary-login sm:text-[40px]'>
            Sign in
          </h1>
          <h2 className='font-medium text-lg mobile-xl:text-xl text-primary-login mt-1 sm:mt-2 sm:text-2xl '>
            Welcome to RetailSense!
          </h2>
        </div>
        <div className='flex items-center px-14 py-6 mobile:px-16 mobile:py-8 mobile-xl:px-20 md:px-0 md:py-0'>
          <div className=' md:w-[320px] lg:w-[340px] 3xl:w-[420px]  lg:px-4  3xl:px-0 '>
            <Image
              src={loginimg}
              width='full'
              height='full'
              alt='login page image'
            />
          </div>
        </div>
      </div>
      {/* image div end */}
      {/* form started */}
      <div className='mt-2  md:mt-0 md:w-1/2 '>
        <div className=' md:rounded-lg md:border-[1.6px] md:border-primary-login md:p-8 lg:p-12  md:w-[320px] lg:w-[340px] 3xl:w-[420px] '>
          <div className='hidden md:block'>
            <h1 className='font-bold  text-primary-login  md:text-3xl lg:text-4xl 3xl:text-[40px]'>
              Sign in
            </h1>
            <h2 className='font-medium text-primary-login  md:text-lg md:mt-1 lg:text-xl 3xl:text-2xl xl:mt-3'>
              Welcome to RetailSense!
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className='md:pt-8'
          >
            <div className=''>
              <div className='relative '>
                <input
                  type='email'
                  id='floating_email'
                  autoComplete='new-email'
                  className={`${
                    emailField ? '!border-primary' : ''
                  } block px-2.5 py-2.5 font-medium h-[45px] mobile:h-[51px] md:h-[40px] 2xl:h-[51px]  w-full  text-md lg:text-base text-primary-login bg-white rounded-lg border-[1.6px] border-primary-login appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer`}
                  placeholder=''
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'please provide the email',
                    },
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: 'invalid email address',
                    },
                  })}
                />
                <label
                  htmlFor='floating_email'
                  className={` ${
                    emailField ? '!text-primary !font-medium' : ''
                  } absolute text-md lg:text-base font-medium text-primary-login bg-white duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] bg-lynx-white  px-2 ml-2 peer-focus:px-2 peer-focus:ml-2 peer-focus:font-medium peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                  Enter Email
                </label>
              </div>
              <div>{showErrormsg(errors, 'email')}</div>
            </div>
            <div>
              <div className='relative mt-4 sm:mt-6'>
                <input
                  type={showpassword ? 'text' : 'password'}
                  id='floating_password'
                  autoComplete='new-password'
                  className={`${
                    passwordField ? '!border-primary' : ''
                  } block px-2.5 py-2.5 font-medium h-[45px] mobile:h-[51px] md:h-[40px] 2xl:h-[51px]  w-full  text-md lg:text-base text-primary-login bg-white rounded-lg border-[1.6px] border-primary-login appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer`}
                  placeholder=''
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'please provide the password',
                    },
                    // pattern: {
                    //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                    //   message: 'invalid email address',
                    // },
                  })}
                />
                <label
                  htmlFor='floating_password'
                  className={`${
                    passwordField ? '!text-primary !font-medium' : ''
                  } absolute text-md lg:text-base font-medium text-primary-login bg-white duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] bg-lynx-white  px-2 ml-2 peer-focus:px-2 peer-focus:ml-2 peer-focus:font-medium peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                  Enter Password
                </label>
                <button className='absolute p-2 top-1/2 transform -translate-y-1/2 right-1'>
                  {showpassword ? (
                    <Image
                      src={eyeClose}
                      width='full'
                      height='full'
                      alt='eyeClose icon'
                      onClick={(e) => {
                        e.preventDefault();
                        setShowpassword(!showpassword);
                      }}
                    />
                  ) : (
                    <Image
                      src={eyeOpen}
                      width='full'
                      height='full'
                      alt='eyeOpen icon'
                      onClick={(e) => {
                        e.preventDefault();
                        setShowpassword(!showpassword);
                      }}
                    />
                  )}
                </button>
              </div>
              <div>{showErrormsg(errors, 'password')}</div>
            </div>

            <div className='mt-2 mobile-xl:mt-3 sm:mt-3  flex justify-between items-center'>
              <Checkbox
                label='Remember me'
                classNames={{
                  body: ' !flex !flex-row !items-center',
                  input: ' !border-[1.6px] !border-primary-login',
                  label:
                    ' !text-primary-login  !font-medium !text-xs mobile:!text-xs mobile-xl:!text-sm sm:!text-md md:!text-xs lg:!text-base',
                }}
              />
              <Link
                href='/auth/forgot-password'
                className='text-xs font-medium text-primary mobile:!text-xs mobile-xl:!text-sm sm:!text-lg md:!text-xs lg:!text-base'
              >
                Forgot Password?
              </Link>
            </div>
            <div className='mt-8 sm:mt-10'>
              <PrimaryButton
                loading={signinLoading}
                rootClassName='!h-[45px] mobile:!h-[51px] md:!h-[40px] 2xl:!h-[51px]  !w-full  !rounded-lg mobile:!h-[51px]'
                titleClassName='!text-base  !font-bold sm:!text-lg md:!text-sm lg:!text-base'
                type='submit'
                //   variant='gradient'
              >
                Sign in
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
      {/* form end */}
    </div>
  );
}
