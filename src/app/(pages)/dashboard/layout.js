export default function DashboardLayout({
  children,
  leaves,
  notifications,
  users,
}) {
  return (
    <section className='min-h-[91.5vh] bg-gray-100'>
      <div className='pt-10 pl-6 text-3xl font-semibold'>{children}</div>
      <div className='flex mt-6 gap-x-4'>
        <div className='flex-1 gap-y-4 flex flex-col h-[80vh]'>
          <div className='bg-gray-300 h-1/2 p-4'>{leaves}</div>
          <div className='bg-gray-200 h-1/2 p-4'>{users}</div>
        </div>
        <div className='flex-1 h-[80vh] bg-green-300 p-4'>{notifications}</div>
      </div>
    </section>
  );
}
