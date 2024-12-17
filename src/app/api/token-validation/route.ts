import { tokenValidation } from "@/lib/utils";

export async function GET(request: Request) {

    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return new Response('Unauthorized', {
            status: 401
        });
    }

    const validated: boolean = await tokenValidation(token);

    if (validated) {
        return new Response(null, {
            status: 204
        })
    }
        
    return new Response('Unauthorized', {
        status: 401
    })
}