import Image from 'next/image';
import HOmePic from '../../public/1a.webp';
import p1 from '../../public/2a.webp';
import p2 from '../../public/3a.webp';
import p3 from '../../public/4a.webp';
import Link from 'next/link';
import Navbar from './_components/navbar';
import { authOptions } from './api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import Header from './_components/header';

const products = [
  {
    id: 1,
    title: 'Product 1',
    image: p1, // Replace with the actual image path or URL
    price: 29.99,
  },
  {
    id: 2,
    title: 'Product 2',
    image: p2,
    price: 39.99,
  },
  {
    id: 3,
    title: 'Product 3',
    image: p3,
    price: 49.99,
  },
  // Add more products as needed
];

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session,'session')

  return (
    <>
    <Header />
      <Navbar />
      {session ? (
        <>
          <main className='h-screen w-full flex'>
            <div className='w-1/2 h-full bg-gray-100 flex justify-center items-center'>
              <div className='w-[50%]'>
                <h1 className='text-6xl capitalize leading-relaxed font-bold text-violet-600'>
                  welcome to home page, please explore more...
                </h1>
                <p></p>
              </div>
            </div>
            <div className='w-1/2 h-full bg-green-100 flex justify-center items-center'>
              <div className='w-[70%] h-[50%] '>
                <Image
                  src={HOmePic}
                  alt='Picture of the author'
                  // width={500} automatically provided
                  // height={500} automatically provided
                  // blurDataURL="data:..." automatically provided
                  // placeholder="blur" // Optional blur-up while loading
                />
              </div>
            </div>
          </main>

          <div className='pt-10'>
            <div>
              <h2 className='capitalize text-4xl text-green-500 font-semibold pl-6'>
                featured products
              </h2>
            </div>
            <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 '>
              {products.map((product) => {
                const { title, price, image } = product;
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className='bg-red-200 h-80 shadow-xl hover:shadow-2xl transition duration-300 '
                  >
                    <div className='px-4 pt-4  h-5/6'>
                      <Image
                        src={image}
                        alt='Picture of the author'
                        className='rounded-xl h-full w-full'
                        // width={500} automatically provided
                        // height={500} automatically provided
                        // blurDataURL="data:..." automatically provided
                        // placeholder="blur" // Optional blur-up while loading
                      />
                    </div>
                    <div className=' items-center text-center h-1/6'>
                      <h2 className='card-title capitalize tracking-wider'>
                        {title}
                      </h2>
                      <span className='text-secondary'>{`$ ${price}`}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <h1 className='text-5xl text-center mt-60'>Please Login to view Pages...</h1>
      )}
    </>
  );
}
