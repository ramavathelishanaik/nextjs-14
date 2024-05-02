import Image from 'next/image';
import p1 from '../../../../../public/2a.webp';

export default function ProductsDetailPage({ params }) {
  return (
    <div className='min-h-[91.5vh] w-full flex'>
      <div className='flex-1 flex justify-center items-center'>
        <div className='h-[60%] w-[50%]'>
          <Image
            src={p1}
            alt='Picture of the author'
            className='rounded-xl h-full w-full'
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </div>
      </div>
      <div className='flex-1 bg-gray-100 flex justify-center items-center'>
        <div className='p-10 bg-red-100'>
          <h1 className='capitalize text-3xl font-bold'>camara</h1>
          <h4 className='text-xl text-neutral-content font-bold mt-2'>canon</h4>

          <p className='mt-3 text-xl'>$ 999/-</p>

          {/* CART BUTTON */}
          <div className='mt-10 '>
            <button className='bg-blue-200 p-4 font-bold'>Add to bag</button>
          </div>
        </div>
      </div>
    </div>
  );
}
