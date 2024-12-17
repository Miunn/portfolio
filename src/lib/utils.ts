import { type ClassValue, clsx } from "clsx"
import { jwtVerify } from "jose";
import { twMerge } from "tailwind-merge"

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET!)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function tokenValidation(token: string): Promise<boolean> {
  try {
    const { payload, protectedHeader } = await jwtVerify(token, jwtConfig.secret, {
      issuer: process.env.JWT_ISSUER
    })

    return true;
  } catch (e) {
    return false;
  }
}