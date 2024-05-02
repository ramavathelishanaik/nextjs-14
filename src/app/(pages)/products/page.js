import Link from 'next/link';
import Image from 'next/image'
import p2 from '../../../../public/products/p2.webp'
import p3 from '../../../../public/products/p3.webp'
import p4 from '../../../../public/products/p4.webp'
import p5 from '../../../../public/products/p5.jpg'
import p6 from '../../../../public/products/p6.jpg'
import p7 from '../../../../public/products/p7.webp'
import p10 from '../../../../public/products/p10.jpg'
import p11 from '../../../../public/products/p11.jpg'


const products = [
  
    {
      id: 2,
      title: 'Product B',
      image: p2,
      price: 29.99,
    },
    {
      id: 3,
      title: 'Product C',
      image: p3,
      price: 39.99,
    },
    {
      id: 4,
      title: 'Product D',
      image: p4,
      price: 49.99,
    },
    {
      id: 5,
      title: 'Product E',
      image: p5,
      price: 24.99,
    },
    {
      id: 6,
      title: 'Product F',
      image: p6,
      price: 34.99,
    },
    {
      id: 7,
      title: 'Product G',
      image: p7,
      price: 44.99,
    },
  
    {
      id: 10,
      title: 'Product J',
      image: p10,
      price: 29.99,
    },
    {
      id: 11,
      title: 'Product K',
      image: p11,
      price: 39.99,
    },
 
   
  ];

export default function ProductsPage(){
    return (
        <div className='pt-10'>
        <div>
          <h2 className='capitalize text-4xl text-green-500 font-semibold pl-6'>featured products</h2>
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
    )
}