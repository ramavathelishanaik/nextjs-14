import { authOptions } from '../../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export default async function ServerPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server');
  }

  return (
    <section className='min-h-[91.5vh] bg-gray-100 flex justify-center items-center'>
      <h2 className='text-4xl font-semibold'>Normal page which is rendered in server side...</h2>
    </section>
  );
}
