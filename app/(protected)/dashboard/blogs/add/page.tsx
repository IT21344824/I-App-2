
import React from 'react';
import { Add_blog_InputForm } from '@/components/blogs/add_blog';

const Page = () => {
  return (
    <div className=''>
      <div className='shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] pt-px pb-2 px-5 rounded-lg'>
        <div className="flex justify-between mt-5 mb-7">
          <div className="flex-auto border-b-2 border-black">
            <p className="ml-2 flex items-center text-2xl font-bold">Add Product</p>
          </div>

        </div>

        <div>
          <Add_blog_InputForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
