import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { Prisma, PrismaClient } from "@prisma/client";
import corsOptions from './config/cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import uploadRoutes from './routes/uploadRoutes';
import adminRoutes from './routes/adminRoutes';
import fileRoutes from './routes/fileRoutes';
import categoryRoutes from './routes/categoryRoutes';
import transactionRoutes from './routes/transactionRoutes';

var nodemailer = require("nodemailer");

const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split(/\r?\n/).forEach(line => {
        const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^#]*))?/);
        if (m) {
            const key = m[1];
            const val = m[2] ?? m[3] ?? (m[4] ? m[4].trim() : '');
            if (val && !process.env[key]) process.env[key] = val;
        }
    });
}

if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('localhost')) {
    console.log('Adjusting DATABASE_URL: replacing localhost with 127.0.0.1 to avoid IPv6 connect issues');
    process.env.DATABASE_URL = process.env.DATABASE_URL.replace('localhost', '127.0.0.1');
    console.log('Effective DATABASE_URL:', process.env.DATABASE_URL);
}

const app = express();
const options = corsOptions;
const prisma = new PrismaClient();
app.use(express.json());
app.use(cors(options));
app.use(express.urlencoded({ extended: true }));

// Serve static images
app.use('/images', express.static(path.join(__dirname, '../images')));

app.use('/prisma/moneybank', authRoutes);
app.use('/prisma/moneybank', userRoutes);
app.use('/prisma/moneybank', uploadRoutes);
app.use('/prisma/moneybank', adminRoutes);
app.use('/prisma/moneybank', fileRoutes);
app.use('/prisma/moneybank', categoryRoutes);
app.use('/prisma/moneybank', transactionRoutes);


app.use((req: any, res: any) => {
    res.status(404).json({ message: `Route ${req.path} not found` });
});

app.listen(2001, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:2001`);
});
