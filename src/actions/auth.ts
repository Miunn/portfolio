"use server"

import { tokenValidation } from "@/lib/auth";
import { cookies } from "next/headers";

export async function isAuthenticated() {
    const reqCookies = cookies();

    if (await tokenValidation(reqCookies.get("jwt_session")?.value ?? "")) {
        return true;
    }
    return false;
}