'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { users } from '@/app/_helpers/constant';

const UserRegistrationPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const newUser = {
    //   id: users?.length +1,
    //   name: formData?.name,
    //   email: formData?.email,
    //   password: formData?.password,
    // };

    // users.push(newUser)


    // Add your registration logic here, such as sending data to a server or performing client-side validation
    console.log('Form submitted:', formData);
  };

  return (
    <div className='bg-gray-100 h-screen'>
      <div className='container  mx-auto p-4'>
        <h1 className='text-3xl font-bold mt-10 mb-4 ml-[30vw]'>
          User Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className='max-w-md mx-auto mt-20'
          noValidate
        >
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-gray-700 font-bold mb-2'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='border p-2 w-full'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-gray-700 font-bold mb-2'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='border p-2 w-full'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-gray-700 font-bold mb-2'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='border p-2 w-full'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='confirmPassword'
              className='block text-gray-700 font-bold mb-2'
            >
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='border p-2 w-full'
              required
            />
          </div>

          <button
            type='submit'
            className='bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-700'
            onClick={() => router.push('/')}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationPage;
