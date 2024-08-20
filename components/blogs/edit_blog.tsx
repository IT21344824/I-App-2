"use client";

import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { InputForm } from "./blog_config/Reuse_Form";
import { BLOG_API_ROUTES } from "@/components/blogs/blog_config/Blogs_Api_Routes";
import { z } from "zod";
import { generateSchema } from "./blog_config/generateSchema";
import { useEffect, useState } from 'react';

type FormValues = z.infer<ReturnType<typeof generateSchema>>;

export function Edit_Blog_InputForm({ blogId }) {
    const router = useRouter();
    const [data, setData] = useState<FormValues | null>(null); // Correct the initial state type

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${BLOG_API_ROUTES.GET_BLOG}${blogId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blog data');
                }
                const blog = await response.json();
                setData(blog);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        if (blogId) {
            fetchData();
        }
    }, [blogId]);

  

    if (!data) {
        return <p>Loading...</p>; // Handle the loading state
    }

    const handleUpdate: SubmitHandler<FormValues> = async (data) => {
    try {
        const updatedData = { ...data, id: blogId }; // Include blogId in the data

        const response = await fetch(`${BLOG_API_ROUTES.UPDATE_BLOG}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData), // Send the id along with other data
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Failed to submit data: ${errorData}`);
        }

        alert("Blog updated successfully");
        const result = await response.json();
        toast({
            title: "Blog updated successfully",
        });

        // Redirect to /dashboard/blogs after successful submission
        router.push('/dashboard/blogs');

    } catch (error) {
        console.error("Error submitting form:", error);
        toast({
            title: "Failed to submit",
            description: error.message,
            variant: "destructive",
        });
    }
};


    return (
        <div>
            <InputForm
                initialValues={{
                    Name: data.Name || "",
                    Views: data.Views || 0,
                    Description: data.Description || "",
                }}
                onSubmit={handleUpdate}
            />
        </div>
    );
}
