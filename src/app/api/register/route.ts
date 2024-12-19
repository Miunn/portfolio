/*import * as bcrypt from 'bcrypt';
import { prisma } from "@/lib/prisma";

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

    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS!));

    await prisma.user.create({
        data: {
            email: email,
            password: hash,
            role: "admin"
        }
    });

    return new Response('Created', {
        status: 200
    })
}*/