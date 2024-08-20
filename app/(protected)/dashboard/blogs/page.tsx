
import Link from 'next/link';
import React from 'react';
import { Blog_Table } from '@/components/blogs/blog_list';
import { Button } from '@/components/ui/button';

const Page = () => {

  return (
    <div>
      {/* <hr className="mb-2" /> */}
      <div className='shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] pt-px  px-2 rounded-lg'>
        <div className="flex justify-between mt-5">
          <div className="flex-auto border-b-2 border-black">
            <p className="ml-2 flex items-center text-2xl font-bold">Product List</p>
          </div>
          <Link href="/dashboard/blogs/add">
            <Button className="ml-10 hover:bg-gray-600"> {/* 40px margin-left */}
              Add New
            </Button>
          </Link>
        </div>

        <div>
          <Blog_Table />
        </div>
      </div>
    </div>
  );
};

export default Page;
