import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/tokenUtils';

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ message: "Unauthorized" });
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token is missing' });
    }
    try {
        const decoded = await verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch (error: any) {
        res.status(401).json({ message: 'Unauthorized: Invalid or expired token', success: 0 });
    }
};


export const adminOnly = (req: any, res: any, next: any) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            message: "Forbidden: Admin access only",
            success: false
        });
    }
    next();
};

