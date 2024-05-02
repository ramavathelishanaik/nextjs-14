'use client';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import PrimaryButton from '../../../../common/primary_button/index.js';
import loginimg from '../../../../../public/assets/images/loginImg.png';
import { useForgotPassword } from '../hooks/useForgotPassword.js';

export default function MainForgotPasswordPage() {
  //invoking the react hook form
  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      email: '',
    },
  });

  //to meet the floting email and password labels we watching these fields and giving styling conditionally
  const emailField = watch('email');

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

  const { forgotPassword, isPending, isSuccess, reset } = useForgotPassword();

  useEffect(() => {
    if (!isSuccess) return;

    // Reset isSuccess state if input field value changes
    const handleEmailChange = () => {
      reset();
    };

    // Add event listener to email field
    const emailValue = watch('email');
    if (emailValue) {
      document
        .getElementById('floating_email')
        .addEventListener('input', handleEmailChange);
    }

    // Clean up function to remove event listener
    return () => {
      if (emailValue) {
        document
          .getElementById('floating_email')
          .removeEventListener('input', handleEmailChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, watch('email')]);

  //form submit function
  const onSubmit = async () => {
    forgotPassword(watch('email'));
  };

  return (
    <div className='h-screen font-ttnorms px-4 pt-10 mobile:px-4 mobile:py-10 mobile-xl:p-8 sm:pt-12 md:p-0 md:flex md:justify-center md:gap-x-8 lg:gap-x-12 xl:gap-x-16 3xl:gap-x-20 md:items-center md:px-12 md:relative'>
      {/* title div started */}
      <div className='hidden  md:absolute md:top-14 lg:top-16 xl:top-16 2xl:top-32 md:flex md:justify-center'>
        <h1 className='text-primary-login text-2xl lg:text-[28px] font-bold'>
          RetailSense
        </h1>
      </div>
      {/* title div end */}
      {/* image div started */}
      <div className='md:w-1/2  md:flex md:justify-end '>
        <div className='md:hidden'>
          <h1 className='font-bold text-3xl mobile-xl:text-4xl text-primary-login sm:text-[40px] '>
            Forgot password
          </h1>
          <h2 className='font-medium text-sm mobile-xl:text-base text-primary-login mt-1 sm:mt-2 sm:text-lg '>
            A link will be sent to your email to reset the password.
          </h2>
        </div>
        <div className='flex items-center px-14 py-6 mobile:px-16 mobile:py-8 mobile-xl:px-20 md:px-0 md:py-0'>
          <div className=' md:w-[320px] lg:w-[340px] 3xl:w-[440px]  lg:px-4  3xl:px-0 '>
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
      <div className='mt-2  md:mt-0 md:w-1/2'>
        <div className=' md:rounded-lg md:border-[1.6px] md:border-primary-login  md:p-8 lg:p-12 md:w-[320px] lg:w-[340px] 3xl:w-[440px] '>
          <div className='hidden md:block'>
            <h1 className='font-bold  text-primary-login  md:text-3xl lg:text-4xl 3xl:text-[40px]'>
              Forgot password
            </h1>
            <h2 className='font-medium  text-primary-login mt-1 md:text-sm md:leading-5 md:mt-10 lg:text-base lg:leading-5 lg:mt-10 3xl:mt-16  3xl:leading-6 3xl:text-lg'>
              A link will be sent to your email to reset the password.
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className='md:pt-6'
          >
            <div className=''>
              <div className='relative '>
                <input
                  type='email'
                  id='floating_email'
                  autoComplete='new-email'
                  className={`${
                    emailField ? '!border-primary' : ''
                  } block px-2.5 py-2.5 font-medium h-[45px] mobile:h-[51px] md:h-[40px] 2xl:h-[51px] w-full  text-md lg:text-base text-primary-login bg-white rounded-lg border-[1.6px] border-primary-login appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer`}
                  placeholder=''
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'please provide the registered email',
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
                  Enter Registered Email
                </label>
              </div>
              <div>{showErrormsg(errors, 'email')}</div>
            </div>

            <div className='mt-6 sm:mt-8'>
              <PrimaryButton
                //   loading={signinLoading}
                rootClassName='!h-[45px] mobile:!h-[51px] md:!h-[40px] 2xl:!h-[51px] !w-full  !rounded-lg mobile:!h-[51px]'
                titleClassName='!text-md  !font-bold sm:!text-lg md:!text-sm lg:!text-base'
                type='submit'
                //   variant='gradient'
                isDisabled={isPending || isSuccess}
              >
                Submit
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
      {/* form end */}
    </div>
  );
}
