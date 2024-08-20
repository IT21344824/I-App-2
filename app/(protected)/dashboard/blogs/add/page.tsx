import React from 'react';
import { Add_blog_InputForm } from '@/components/blogs/add_blog';

const Page = () => {
  return (
    <div>
      <div className='shadow-md px-5 py-2 rounded-lg'>
        <div className="flex justify-between mt-5 mb-7 border-b-2 border-black">
          <p className="ml-2 text-2xl font-bold">Add Product</p>
        </div>
        <div>
          <Add_blog_InputForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
