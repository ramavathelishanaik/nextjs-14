const blogPosts = [
  {
    id: 1,
    title: 'The Top 10 Tech Gadgets You Need in 2024',
    date: 'January 10, 2024',
    content:
      'Explore the latest and greatest tech gadgets that are a must-have in 2024. From smart home devices to cutting-edge wearables, stay ahead of the curve with our top picks for the year.',
  },
  {
    id: 2,
    title: 'How to Choose the Perfect Laptop for Your Business Needs',
    date: 'February 5, 2024',
    content:
      'Selecting the right laptop for your business is crucial. Learn the key factors to consider, from performance and portability to security features. Make an informed decision to boost productivity.',
  },
  {
    id: 3,
    title: 'Unlocking Creativity with the Latest Photography Gear',
    date: 'March 20, 2024',
    content:
      'Photographers, rejoice! Discover the newest photography equipment that can elevate your skills. From high-resolution cameras to advanced lighting solutions, capture stunning moments like never before.',
  },
  // Add more e-commerce-focused blog posts as needed
];

export default function Blog() {
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
