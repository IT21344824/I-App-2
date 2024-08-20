/* eslint-disable tailwindcss/classnames-order */

"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { Edit_Blog_InputForm } from '@/components/blogs/edit_blog';

const Page = () => {
  const params = useParams();
  const encodedBlogId = params.id as string;
  const blogId = decodeURIComponent(encodedBlogId);

  return (
    <div>
      <div className='shadow-md px-5 py-2 rounded-lg'>
        <div className="flex justify-between mt-5 mb-7 border-b-2 border-black">
          <p className="ml-2 text-2xl font-bold">Edit Blog</p>
        </div>
        <div>
          <Edit_Blog_InputForm blogId={blogId || ''} />
        </div>
      </div>
    </div>
  );
};

export default Page;
