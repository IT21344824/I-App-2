"use client"; // Ensure the component is marked as client-side

import React from 'react';
import { useParams } from 'next/navigation'; // Import useParams
import { Edit_Blog_InputForm } from '@/components/blogs/edit_blog';

const Page = () => {
  const params = useParams(); // Use useParams to get route parameters
  const encodedBlogId = params.id as string; // Extract the ID from the parameters
  const blogId = decodeURIComponent(encodedBlogId); // Decode the URL-encoded ID

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
