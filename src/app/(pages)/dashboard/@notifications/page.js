import Link from 'next/link'
export default function Notifications(){
    return (
        <div>
            <h1>Notifications</h1>
            <Link href='/dashboard/archived' className='mt-2'>Archived</Link>

        </div>
    )
}