import Link from 'next/link';
import React from 'react';
import { Blog_Table } from '@/components/blogs/blog_list';
import { Button } from '@/components/ui/button';

const Page = () => {
  return (
    <div>
      <div className='shadow-md px-2 py-1 rounded-lg'>
        <div className="flex justify-between mt-5 border-b-2 border-black">
          <p className="ml-2 text-2xl font-bold">Product List</p>
          <Link href="/dashboard/blogs/add">
            <Button className="ml-10 hover:bg-gray-600">
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
