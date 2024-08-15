"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

const FormSchema = z.object({
    Item_Name: z.string().min(2, {
        message: "Item name must be at least 2 characters.",
    }),
    Quantity: z.preprocess((val) => Number(val), z.number().min(1, {
        message: "Quantity must be at least 1.",
    })),
    Description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
})

export function Add_blog_InputForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            Item_Name: "",
            Quantity: undefined,
            Description: "",
        },
    })


    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await fetch('/api/blogs_API/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.text(); // Get the error message from the response
                throw new Error(`Failed to submit data: ${errorData}`);
            }

            const result = await response.json();
            alert("Product added successfully");
            toast({
                title: "Product added successfully",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(result, null, 2)}</code>
                    </pre>
                ),
            });

            // Optionally reset the form after successful submission
            form.reset();
        } catch (error) {
            alert("Error submitting");
            console.error("Error submitting form:", error);
            toast({
                title: "Failed to submit",
                description: error.message, // Display the specific error message
                variant: "destructive",
            });
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 ">

                {/* Item_Name */}
                <FormField
                    control={form.control}
                    name="Item_Name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Item Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Item Name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the name of the item.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Quantity */}
                <FormField
                    control={form.control}
                    name="Quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Quantity" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the quantity of the item.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description */}
                <FormField
                    control={form.control}
                    name="Description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Description" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the description of the item.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
