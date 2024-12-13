"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { CREATE_RESOURCE_FORM_SCHEMA } from "@/lib/forms";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";

export default function CreateResourceDialog() {

    const create_resource_schema = useForm<z.infer<typeof CREATE_RESOURCE_FORM_SCHEMA>>({
        resolver: zodResolver(CREATE_RESOURCE_FORM_SCHEMA),
        defaultValues: {
            title: "",
            description: "",
            url: "",
            text: "",
        }
    })

    function onSubmit(values: z.infer<typeof CREATE_RESOURCE_FORM_SCHEMA>) {
        console.log(values);
    }

    return (
        <Dialog>
            <DialogTrigger>
                Register a new resource
            </DialogTrigger>
            <DialogOverlay>
                <DialogContent>
                    <Form {...create_resource_schema}>
                        <form onSubmit={create_resource_schema.handleSubmit(onSubmit)} className="space-y-8">
                            <DialogHeader>
                                <DialogTitle>New resource</DialogTitle>
                                <DialogDescription>Register a new resource</DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="h-72 w-full">
                                <div className="pl-px pr-4">
                                    <FormField
                                        control={create_resource_schema.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Title of the new resource
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={create_resource_schema.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Short description for the new resource
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={create_resource_schema.control}
                                        name="url"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Url</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://example.com" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Distant link to the resource
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={create_resource_schema.control}
                                        name="text"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Content</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Content of the resource
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </ScrollArea>
                            <DialogFooter>
                                <DialogClose>
                                    <Button type="button">Close</Button>
                                </DialogClose>
                                <Button type="submit">Submit</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}