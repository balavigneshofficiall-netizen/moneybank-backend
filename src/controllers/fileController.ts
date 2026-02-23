import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const getFile = (req: Request, res: Response) => {
    const fileName = req.params.fileName;
    const filePath = path.resolve(__dirname, '../../images', fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, message: "File not found" });
    }

    res.sendFile(filePath);
};

export const getPdf = (req: Request, res: Response) => {
    const fileName = req.params.fileName;
    const filePath = path.resolve(__dirname, '../../pdf', fileName);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, message: "File not found" });
    }

    res.sendFile(filePath);
};
