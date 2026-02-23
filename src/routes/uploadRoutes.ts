import express, { Request, Response } from "express";
import { uploadImage, uploadVideo, uploadExcel } from "../middleware/upload";

const router = express.Router();

const uploaders: Record<string, typeof uploadImage> = {
    image: uploadImage,
    video: uploadVideo,
    excel: uploadExcel,
};

router.post("/upload/:type", (req: Request, res: Response) => {
    const { type } = req.params;
    const uploader = uploaders[type];
    if (!uploader) {
        return res.status(400).json({ success: false, message: "Invalid upload type" });
    }
    uploader(req, res, async (err) => {
        if (err) return res.status(400).json({ success: false, message: err.message });

        res.json({ success: true, file: req.file });
    });
});

export default router;
