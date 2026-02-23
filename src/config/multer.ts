import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Ensure directory exists (helper function)
function ensureDirExists(dir: any) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Image Storage Configuration
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './images';
        ensureDirExists(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => cb(null, file.originalname),
});

const imageFileFilter = (req: any, file: any, cb: any) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.gif'].includes(ext)) {
        return cb(new Error('Only images are allowed'), false);
    }
    cb(null, true);
};

export const uploadImage = multer({
    storage: imageStorage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 1024 * 1024 }, // 1 MB limit
});

// PDF Storage Configuration
const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './pdf';
        ensureDirExists(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => cb(null, file.originalname),
});

const pdfFileFilter = (req: any, file: any, cb: any) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.pdf') {
        return cb(new Error('Only PDF files are allowed'), false);
    }
    cb(null, true);
};

export const uploadPdf = multer({
    storage: pdfStorage,
    fileFilter: pdfFileFilter,
    // limits: { fileSize: 1024 * 1024 && }, // 1 MB limit
});



const excelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './exceluploads';
        ensureDirExists(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const excelFileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.xlsx', '.xls', '.xlsm'].includes(ext)) {
        return cb(new Error('Only Excel files are allowed (.xlsx, .xls, .xlsm)'), false);
    }
    cb(null, true);
};

export const uploadExcel = multer({
    storage: excelStorage,
    fileFilter: excelFileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
}).single('file');
