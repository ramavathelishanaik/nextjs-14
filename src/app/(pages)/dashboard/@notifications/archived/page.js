import Link from 'next/link'
export default function NotificationsArchived(){
    return (
        <div>
            <h1>Archived Notifications</h1>
            <Link href='/dashboard' className='mt-2'>Default</Link>

        </div>
    )
}