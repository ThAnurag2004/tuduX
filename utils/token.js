import 'dotenv/config'
import jwt from 'jsonwebtoken'
import {userTokenSchema} from '../validation/token.validation.js'

const secret = process.env.JWT_SECRET


export async function createUserToken(payload){
    const validatedToken = await userTokenSchema.safeParseAsync(payload);

    if(validatedToken.error) throw new Error(validatedUserToken.error.format());

    const payloadValidated = validatedToken.data;

    const token = jwt.sign(payloadValidated, secret);

    return token;
}

export async function tokenValidation(token) {
    try {
        const payload = jwt.verify(token,secret);
        return payload;
    } catch (error) {
        return null;
    }
}