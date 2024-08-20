"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { BLOG_API_ROUTES } from "@/components/blogs/blog_config/Blogs_Api_Routes"; // Import the routes
import { generateSchema } from "./generateSchema"
import { inputConfig } from "./inputConfig"

type FormValues = z.infer<ReturnType<typeof generateSchema>>

interface InputFormProps {
    initialValues: FormValues
    onSubmit: SubmitHandler<FormValues>
}



export function InputForm({ initialValues, onSubmit }: InputFormProps) {
    const schema = generateSchema()
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialValues,
    })

    function handleCancel() {
        form.reset(initialValues); // Reset to the initial values provided
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6  ">
                <div className="flex flex-col gap-7">
                    {inputConfig.map((field) => (
                        <FormField
                            key={field.name}
                            control={form.control}
                            name={field.name}
                            render={({ field: formField }) => (
                                <FormItem>
                                    <FormLabel>{field.label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            {...formField}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                </div>


                <div className="flex justify-between">

                    <div className=" flex gap-4">
                        <Link href={`/dashboard/blogs`}>
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                        <Button type="button" onClick={handleCancel} variant="destructive">Clear</Button>
                    </div>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    )
}
