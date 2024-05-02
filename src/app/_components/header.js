import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className=' bg-neutral py-2 text-neutral-content pr-14 bg-green-100'>
      <div className='align-element flex justify-center sm:justify-end '>
        {session ? (
          <div className='flex gap-x-2 sm:gap-x-8 items-center'>
            <p className='text-xs sm:text-sm '>
              Hello,{' '}
              <span className='text-blue-600 font-semibold text-lg'>
                {session?.user?.name}
              </span>
            </p>
            <Link href='/api/auth/signout'>
              <button className='bg-gray-300 px-3 py-1 rounded-sm font-semibold'>
                Sign out
              </button>
            </Link>
          </div>
        ) : (
          <div className='flex gap-x-6 justify-center items-center'>
            <Link
              href='/api/auth/signin'
              className='link link-hover text-xs sm:text-sm bg-gray-300 px-3 py-1 rounded-sm font-semibold'
            >
              Sign in / Guest
            </Link>
            <Link
              href='/register'
              className='link link-hover text-xs sm:text-sm bg-gray-300 px-3 py-1 rounded-sm font-semibold'
            >
              Create an Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
