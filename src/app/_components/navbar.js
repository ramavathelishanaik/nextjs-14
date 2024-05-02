"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';

const navlinks = [
    { name: 'home', href: '/' },
    { name: 'about', href: '/about' },
    { name: 'blog', href: '/blog' },
    { name: 'products', href: '/products' },
    { name: 'server', href: '/server' },
  
  ];

export default function Navbar(){
    const isActivepath = usePathname();
    return (
        <div className='h-20 w-full px-24 flex capitalize justify-center text-xl font-semibold gap-x-10 items-center bg-orange-200 text-blue-700 sticky top-0 left-0'>
        

            {navlinks.map((link) => {
          return (
            <div key={link.name}>
              <Link
                href={link.href}
                className={
                  isActivepath === link.href
                    ? 'font-bold mx-4 text-green-700'
                    : 'text-blue-700 mx-4'
                }
              >
                {link.name}
              </Link>
            </div>
          );
        })}
        </div>
    )
}