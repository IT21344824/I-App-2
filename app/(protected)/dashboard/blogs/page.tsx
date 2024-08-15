/* eslint-disable tailwindcss/classnames-order */

import Link from 'next/link';
import React from 'react';
import { Blog_Table } from '@/components/blogs/blog_list';
import { Button } from '@/components/ui/button';

const Page = () => {
  return (
    <div>
      <hr className="" />

      <div className="">
        <p className="ml-2 flex items-center justify-center text-2xl font-bold">Product List</p>
        <Link href="/dashboard/blogs/add">
          <Button className="hover:bg-gray-600">
            Add New
          </Button>
        </Link>        
      </div>

      <div>
        <Blog_Table />
      </div>
    </div>
  );
};

export default Page;
