'use client';
import Image from 'next/image';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Checkbox, Loader, Popover, Progress, Text } from '@mantine/core';
import { useChangePassword } from '../hooks/useChangePassword.js';
import PrimaryButton from '../../../../common/primary_button/index.js';
import updateimg from '../../../../../public/assets/images/updatepasswordImg.png';
import eyeOpen from '../../../../../public/assets/icons/eyeOpen.svg';
import eyeClose from '../../../../../public/assets/icons/eyeClose.svg';
import IconX from '../../../../../public/assets/icons/cross-red.svg';
import IconCheck from '../../../../../public/assets/icons/correct-success.svg';

export default function MainChangePasswordPage() {
  //states to conditionally showing eyeIcons and placeholder text
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [redirect, setRedirect] = useState(false);

  //invoking the react hook form
  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  //to meet the floting email and password labels we watching these fields and giving styling conditionally
  const oldPasswordField = watch('old_password');
  const newPasswordField = watch('new_password');
  const confirmPasswordField = watch('confirm_password');
  const [popoverOpened, setPopoverOpened] = useState(false);

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

  const { changePassword, isPending, isSuccess } =
    useChangePassword(setRedirect);

  

  //form submit function
  const onSubmit = async () => {
    changePassword({
      old_password: watch('old_password'),
      new_password: watch('new_password'),
    });
  };

  //password validation
  const borderPrimaryColor = '#4CD349';

  const PasswordRequirement = ({ meets, label }) => {
    return (
      <Text
        c={meets ? 'teal' : 'red'}
        style={{ display: 'flex', alignItems: 'center' }}
        mt={7}
        size='sm'
      >
        {meets ? (
          <Image
            src={IconCheck}
            width='20'
            height='20'
            alt='reset page image'
          />
        ) : (
          <Image src={IconX} width='20' height='20' alt='reset page image' />
        )}{' '}
        <Box ml={10}>{label}</Box>
      </Text>
    );
  };

  const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
  ];

  const checks = requirements?.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(watch('new_password'))}
    />
  ));

  function getStrength(password) {
    let multiplier = password?.length > 7 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });
    const mainData = (100 / (requirements.length + 1)) * multiplier;
    return Math.max(100 - mainData, 10);
  }

  const strength = getStrength(watch('new_password'));
  let color;

  if (strength === 100) {
    color = borderPrimaryColor;
  } else if (strength > 50) {
    color = 'yellow';
  } else {
    color = 'red';
  }

  return (
    <div className='h-screen font-ttnorms px-4 pt-10 mobile:px-4 mobile:py-10 mobile-xl:p-8 sm:pt-12 md:p-0 md:flex md:justify-center md:items-center  md:gap-x-8 lg:gap-x-12 xl:gap-x-16 3xl:gap-x-20 md:px-12 md:relative'>
      {/* title div started */}
      <div className='hidden  md:absolute md:top-14 lg:top-16 xl:top-16 2xl:top-32 md:flex md:justify-center'>
        <h1 className='text-primary-login text-2xl lg:text-[28px] font-bold'>
          RetailSense
        </h1>
      </div>
      {/* title div end */}
      {/* image div started */}
      <div className='md:w-1/2  md:flex md:justify-end lg:pr-10'>
        <div className='md:hidden'>
          <h1 className='font-bold text-2xl mobile-xl:text-3xl text-primary-login sm:text-[40px]'>
            Update password
          </h1>
          <h2 className='font-medium mt-1 text-base mobile-xl:text-lg text-primary-login  sm:mt-2 sm:text-xl '>
            For increased security, update your password.
          </h2>
        </div>
        <div className='flex items-center px-14 py-6 mobile:px-16 mobile:py-8 mobile-xl:px-20 md:px-0 md:py-0'>
          <div className=' md:w-[320px] lg:w-[340px] 3xl:w-[440px]  lg:px-4  3xl:px-0 '>
            <Image
              src={updateimg}
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
        <div className=' md:rounded-lg md:border-[1.6px] md:border-primary-login md:p-8 lg:p-12 md:w-[320px] lg:w-[340px] 3xl:w-[440px] '>
          {/* for desktop view */}
          <div className='hidden md:block'>
            <h1 className='font-bold  text-primary-login  md:text-3xl lg:text-4xl 3xl:text-[40px]'>
              Update password
            </h1>

            <h2 className='font-medium  text-primary-login mt-1 md:text-lg md:leading-5 md:mt-2 lg:text-lg lg:leading-5 lg:mt-2 3xl:text-xl  3xl:leading-6'>
              {redirect
                ? 'Great Job!'
                : 'For increased security, update your password.'}
            </h2>
          </div>
          {redirect ? (
            <div className='flex flex-col items-center md:items-start gap-y-3 mt-5 md:mt-8'>
              <Checkbox
                defaultChecked
                label='Password updated succesfully!'
                color='green'
                radius='xl'
                size='md'
                classNames={{
                  body: ' !flex !flex-row !items-center',
                  // input: ' !border-[1.6px] !border-primary-login',
                  label:
                    ' !text-primary-login  !font-medium !font-medium !text-xs mobile:!text-xs mobile-xl:!text-sm sm:!text-base md:!text-xs lg:!text-base',
                }}
              />
              <div className='flex flex-row items-center gap-x-4'>
                <Loader color='blue' size='sm' />
                <h1 className='!text-primary-login  !font-medium !text-xs mobile:!text-xs mobile-xl:!text-sm sm:!text-base md:!text-xs lg:!text-base'>
                  Redirecting
                </h1>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className='md:pt-6 lg:pt-10'
            >
              <div className=''>
                <div className='relative'>
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    id='floating_old_password'
                    autoComplete='new-password'
                    className={`${
                      oldPasswordField ? '!border-primary' : ''
                    } block px-2.5 py-2.5 font-medium h-[45px] mobile:h-[51px] md:h-[40px] 2xl:h-[51px] w-full  text-md lg:text-base text-primary-login bg-white rounded-lg border-[1.6px] border-primary-login appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer`}
                    placeholder=''
                    {...register('old_password', {
                      required: {
                        value: true,
                        message: 'old password',
                      },
                      // pattern: {
                      //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                      //   message: 'invalid email address',
                      // },
                    })}
                  />
                  <label
                    htmlFor='floating_old_password'
                    className={`${
                      oldPasswordField ? '!text-primary !font-medium' : ''
                    } absolute text-md lg:text-base font-medium text-primary-login bg-white duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] bg-lynx-white  px-2 ml-2 peer-focus:px-2 peer-focus:ml-2 peer-focus:font-medium peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                  >
                    Old Password
                  </label>
                  <button className='absolute p-2 top-1/2 transform -translate-y-1/2  right-1'>
                    {showOldPassword ? (
                      <Image
                        src={eyeClose}
                        width='full'
                        height='full'
                        alt='eyeClose icon'
                        onClick={(e) => {
                          e.preventDefault();
                          setShowOldPassword(!showOldPassword);
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
                          setShowOldPassword(!showOldPassword);
                        }}
                      />
                    )}
                  </button>
                </div>
                <div>{showErrormsg(errors, 'old_password')}</div>
              </div>

              <div>
                <Popover
                  opened={popoverOpened}
                  position='bottom'
                  width='target'
                  transitionProps={{ transition: 'pop' }}
                >
                  <Popover.Target>
                    <div
                      className='relative mt-4 sm:mt-6'
                      onFocusCapture={() => setPopoverOpened(true)}
                      onBlurCapture={() => setPopoverOpened(false)}
                    >
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        id='floating_new_password'
                        autoComplete='new-password'
                        className={`placeholder-style ${
                          newPasswordField ? '!border-primary' : ''
                        } block px-2.5 py-2.5 font-medium h-[45px] mobile:h-[51px] md:h-[40px] 2xl:h-[51px] w-full  text-md lg:text-base text-primary-login bg-white rounded-lg border-[1.6px] border-primary-login appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer`}
                        placeholder={
                          isNewPasswordFocused ? 'Enter min 8 characters' : ''
                        }
                        {...register('new_password', {
                          required: {
                            value: true,
                            message: 'new password',
                          },
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$&+,:;=?@#|'<>.^*()%!-]).{8,}$/,
                          },
                          validate: (value) =>
                            value !== oldPasswordField ||
                            'New and old passwords should not be same',
                        })}
                        onFocus={() => setIsNewPasswordFocused(true)}
                        onBlur={() => setIsNewPasswordFocused(false)}
                      />
                      <label
                        htmlFor='floating_new_password'
                        className={`${
                          newPasswordField ? '!text-primary !font-medium' : ''
                        } absolute text-md lg:text-base font-medium text-primary-login bg-white duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] bg-lynx-white  px-2 ml-2 peer-focus:px-2 peer-focus:ml-2 peer-focus:font-medium peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                      >
                        New Password
                      </label>
                      <button className='absolute p-2 top-1/2 transform -translate-y-1/2  right-1'>
                        {showNewPassword ? (
                          <Image
                            src={eyeClose}
                            width='full'
                            height='full'
                            alt='eyeClose icon'
                            onClick={(e) => {
                              e.preventDefault();
                              setShowNewPassword(!showNewPassword);
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
                              setShowNewPassword(!showNewPassword);
                            }}
                          />
                        )}
                      </button>
                    </div>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Progress color={color} value={strength} size={5} mb='xs' />
                    <PasswordRequirement
                      label='Includes at least 8 characters'
                      meets={watch('new_password')?.length > 7}
                    />
                    {checks}
                  </Popover.Dropdown>
                </Popover>

                <div>{showErrormsg(errors, 'new_password')}</div>
              </div>

              <div>
                <div className='relative mt-4 sm:mt-6'>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id='floating_confirm_password'
                    autoComplete='new-password'
                    className={`${
                      confirmPasswordField ? '!border-primary' : ''
                    } block px-2.5 py-2.5 font-medium h-[45px] mobile:h-[51px] md:h-[40px] 2xl:h-[51px] w-full  text-md lg:text-base text-primary-login bg-white rounded-lg border-[1.6px] border-primary-login appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer`}
                    placeholder=''
                    {...register('confirm_password', {
                      required: {
                        value: true,
                        message: 'confirm password',
                      },
                      // pattern: {
                      //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                      //   message: 'invalid email address',
                      // },
                      validate: (value) =>
                        value === newPasswordField ||
                        'New and confirm passwords do not match',
                    })}
                  />
                  <label
                    htmlFor='floating_confirm_password'
                    className={`${
                      confirmPasswordField ? '!text-primary !font-medium' : ''
                    } absolute text-md lg:text-base font-medium text-primary-login bg-white duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] bg-lynx-white  px-2 ml-2 peer-focus:px-2 peer-focus:ml-2 peer-focus:font-medium peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                  >
                    Confirm Password
                  </label>
                  <button className='absolute p-2 top-1/2 transform -translate-y-1/2 right-1'>
                    {showConfirmPassword ? (
                      <Image
                        src={eyeClose}
                        width='full'
                        height='full'
                        alt='eyeClose icon'
                        onClick={(e) => {
                          e.preventDefault();
                          setShowConfirmPassword(!showConfirmPassword);
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
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                      />
                    )}
                  </button>
                </div>
                <div>{showErrormsg(errors, 'confirm_password')}</div>
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
          )}
        </div>
      </div>
      {/* form end */}
    </div>
  );
}
