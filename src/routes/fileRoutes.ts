import { Router } from 'express';
import { uploadImage, uploadPdf } from '../config/multer';
import { getFile } from '../controllers/fileController';

const router = Router();


// Route to serve images
router.get('/images/:fileName', getFile);
// Route to serve pdf

export default router;
