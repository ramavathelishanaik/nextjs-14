"use client"
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


export default function About(){
    const router = useRouter();

    const handleclick=()=>{
        router.push('/')
    }

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/about')
        }
    })



    return (
        <div className='min-h-[91.5vh] bg-gray-100 flex justify-center items-center'>
            <div className=''>
                <h2 className='text-4xl '>
                    Hey, i am Naik
                </h2>
                <button className='bg-blue-200 p-2 rounded-sm font-semibold mt-6 capitalize ml-12' onClick={handleclick}>back to home</button>
                <p></p>
            </div>

        </div>
    )
}