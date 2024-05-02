const blogPosts = [
    {
        id: 2,
        title: 'How to Choose the Perfect Laptop for Your Business Needs',
        date: 'February 5, 2024',
        content:
          'Selecting the right laptop for your business is crucial. Learn the key factors to consider, from performance and portability to security features. Make an informed decision to boost productivity.',
      },
    
    // Add more e-commerce-focused blog posts as needed
  ];

export default function Blog2(){
  console.log(naik)
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
    )
}