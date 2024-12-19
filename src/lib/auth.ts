import { jwtVerify } from "jose";

const jwtConfig = {
    secret: new TextEncoder().encode(process.env.JWT_SECRET!)
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