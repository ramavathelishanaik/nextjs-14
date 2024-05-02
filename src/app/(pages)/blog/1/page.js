import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

const blogPosts = [
  {
    id: 1,
    title: 'The Top 10 Tech Gadgets You Need in 2024',
    date: 'January 10, 2024',
    content:
      'Explore the latest and greatest tech gadgets that are a must-have in 2024. From smart home devices to cutting-edge wearables, stay ahead of the curve with our top picks for the year.',
  },

  // Add more e-commerce-focused blog posts as needed
];

export default async function Blog1() {
  const session = await getServerSession(authOptions);
  console.log(session,'session')




  return (
    <div className='min-h-[91.5vh] bg-gray-100'>
      <div className='container mx-auto p-4'>
        <h1 className='text-3xl font-bold mt-4 mb-4'>Blog</h1>

        {blogPosts.map((post) => (
          <div key={post.id} className='mb-8 mt-10'>
            <h2 className='text-xl font-bold mb-2'>{post.title}</h2>
            <p className='text-gray-600 mb-2'>{post.date}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
