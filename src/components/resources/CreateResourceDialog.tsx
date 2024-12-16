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
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react"
import { Item, MultiSelect } from "../ui/multi-autocomplete";
import { createResource, getTags } from "@/actions/resources";
import { toast } from "@/hooks/use-toast";
import { ResourceCardTag } from "../ResourcesExpandableLayout";

export default function CreateResourceDialog({ tags }: { tags: ResourceCardTag[] }) {
    const [creating, setCreating] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<ResourceCardTag[]>([]);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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
        setCreating(true);

        createResource(values.title, values.description, values.text, values.url, selectedTags)
        .then((r) => {
            if (r.status !== "ok") {
                toast({
                    title: "Failed to create resource",
                    description: "Unknown error happened when trying to create the resource"
                });
                return;
            }
            toast({
                title: "Resource created",
                description: "Resource has been successfully created"
            })
            setCreating(false);
            setDialogOpen(false);
        });
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button className="z-10">Register a new resource</Button>
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
                                    <FormField
                                        control={create_resource_schema.control}
                                        name="tags"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tags</FormLabel>
                                                <FormControl>
                                                    <MultiSelect
                                                        items={tags.length > 0 ? tags as unknown as Item[] : []}
                                                        selectedItems={selectedTags}
                                                        setSelectedItems={setSelectedTags}
                                                        {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Resource's tags
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </ScrollArea>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button">Close</Button>
                                </DialogClose>
                                {creating
                                    ? <Button type="submit" className="flex gap-4 items-center" disabled><Loader2 className="animate-spin" /> Submit</Button>
                                    : <Button type="submit">Submit</Button>
                                }
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}