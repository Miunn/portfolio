"use client"

import { LOGIN_FORM_SCHEMA } from "@/lib/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { FormField, FormItem, FormLabel, FormControl, Form, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const loginForm = useForm<z.infer<typeof LOGIN_FORM_SCHEMA>>({
        resolver: zodResolver(LOGIN_FORM_SCHEMA),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function onSubmit(values: z.infer<typeof LOGIN_FORM_SCHEMA>) {
        setLoading(true);

        const r = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({
                email: values.email,
                password: values.password
            })
        });
        setLoading(false);

        if (r.ok) {
            toast({
                title: "Logged in",
                description: "User successfully logged in"
            })
            router.push("/resources");
        } else {
            toast({
                title: "Failed to login",
                description: "Email or password incorrect",
                variant: "destructive"
            })
        }
    }

    return (
        <Card className="w-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Login to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
                        <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder={"email@example.com"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder={"••••••••••••"} type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {loading
                            ? <Button type="submit" className="w-fit self-end" disabled><Loader2 className="animate-spin mr-1" /> Login</Button>
                            : <Button type="submit" className="w-fit self-end">Login</Button>
                        }
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}