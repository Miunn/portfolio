import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Rémi Caulier - Login'
}

export default function LoginPage() {
    return (
        <LoginForm />
    )
}