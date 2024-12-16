import { createSecretKey } from "crypto";
import {SignJWT} from 'jose';
import { headers } from "next/headers";

export async function POST(request: Request) {
    let res;
    try {
        res = await request.json();
    } catch (SyntaxError) {
        return new Response("Bad request", {
            status: 400
        })
    }

    const email = res.email;
    const password = res.password;

    if (!email || !password) {
        return new Response("Bad request", {
            status: 400
        })
    }

    const secretKey = createSecretKey(process.env.JWT_SECRET!, 'utf-8');

    const token = await new SignJWT({ email: email, role: "admin" })
                                .setProtectedHeader({ alg: 'HS256'})
                                .setIssuedAt()
                                .setIssuer(process.env.JWT_ISSUER!)
                                .setExpirationTime(process.env.JWT_EXPRIRATION_DELAY!)
                                .sign(secretKey);

    return new Response('OK', {
        headers: {
            'Set-Cookie': `jwt_session=${token}`
        }
    })
}