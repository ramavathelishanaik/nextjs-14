const reviews = [
  {
    id: 101,
    user: 'John Doe',
    rating: 4.5,
    comment: 'Great phone with excellent camera quality.',
  },
  {
    id: 102,
    user: 'Jane Smith',
    rating: 5.0,
    comment: 'Fast delivery and the phone exceeded my expectations!',
  },
  {
    id: 201,
    user: 'Alice Johnson',
    rating: 4.0,
    comment: 'Solid performance, but the battery life could be better.',
  },
  {
    id: 202,
    user: 'Bob Williams',
    rating: 4.5,
    comment: 'Sleek design and powerful specs. Impressed!',
  },
];

export default function inidividualReview() {
  return (
    <div className='min-h-[91.5vh] bg-gray-100 text-center'>
      <h1 className='text-4xl pt-24 capitalize font-semibold text-blue-500'>inidividual review of the product</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 '>
        {reviews.map((review) => (
          <div key={review.id} className=' p-4 rounded-md bg-gray-200 border-2 border-solid border-gray-300'>
            <h3 className='text-lg font-bold mb-2'>{review.user}</h3>
            <p className='text-gray-600 mb-2'>Rating: {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
