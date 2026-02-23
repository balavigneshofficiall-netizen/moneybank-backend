import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || "ovantica1234";

export const generateToken = (payload: any) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY);
};
