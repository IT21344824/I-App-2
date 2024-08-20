"use client"

import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { InputForm } from "./blog_config/Reuse_Form"
import { BLOG_API_ROUTES } from "@/components/blogs/blog_config/Blogs_Api_Routes"
import { z } from "zod"
import { generateSchema } from "./blog_config/generateSchema"

type FormValues = z.infer<ReturnType<typeof generateSchema>>

export function Add_blog_InputForm() {
    const router = useRouter()

    const handleCreateSubmit: SubmitHandler<FormValues> = async (data) => {
        try {

            const response = await fetch(BLOG_API_ROUTES.ADD, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorData = await response.text()
                throw new Error(`Failed to submit data: ${errorData}`)
            }
            
            alert("Blog added successfully")
            const result = await response.json()
            toast({
                title: "Blog added successfully",
            })
            // Redirect to /dashboard/blogs after successful submission
            router.push('/dashboard/blogs');

        } catch (error) {
            console.error("Error submitting form:", error)
            toast({
                title: "Failed to submit",
                description: error.message,
                variant: "destructive",
            })


        }
    }

    return (
        <div>
            <InputForm
                initialValues={{
                    Name: "",
                    Views: undefined,
                    Description: "",
                }}
                onSubmit={handleCreateSubmit}
            />
        </div>
    )
}
