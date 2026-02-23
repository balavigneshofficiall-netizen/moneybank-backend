import multer, { FileFilterCallback, Options } from "multer";
import path from "path";
import { Request } from "express";
import fs from "fs";

export const imageFilter: Options["fileFilter"] = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".png", ".jpg", ".jpeg", ".gif", ".pdf"].includes(ext)) {
        return cb(new Error("Only image and PDF files are allowed!"));
    }
    cb(null, true);
};


export const videoFilter: Options["fileFilter"] = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".mp4", ".gif"].includes(ext)) {
        return cb(new Error("Only video files are allowed!"));
    }
    cb(null, true);
};

export const excelFilter: Options["fileFilter"] = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".xlsx", ".xlsm"].includes(ext)) {
        return cb(new Error("Only Excel files are allowed!"));
    }
    cb(null, true);
};

const storage = (folder: string) =>
    multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = path.resolve(folder);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    });

export const uploadImage = multer({
    storage: storage("./images"),
    fileFilter: imageFilter,
    limits: { fileSize: 1024 * 1024 * 50 },
}).single("image");


export const uploadVideo = multer({
    storage: storage("./video"),
    fileFilter: videoFilter,
    limits: { fileSize: 1024 * 1024 * 500 },
}).single("video");

export const uploadExcel = multer({
    storage: storage("./excel"),
    fileFilter: excelFilter,
    limits: { fileSize: 1024 * 1024 * 200 },
}).single("file");
