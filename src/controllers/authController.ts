
import { sendMailOtp } from '../utils/sendMail';
import prisma from '../config/db';
import bcrypt from "bcryptjs";
import { generateToken } from '../utils/tokenUtils';



export const login = async (req: any, res: any) => {
    const email = (req.body.email || "").trim();
    const password = (req.body.password || "").trim();
    console.log(req.body);

    if (!email || !password) {
        return res.json({ message: "Required fields missing", success: false });
    }

    try {
        const user = await prisma.bank_user.findFirst({
            where: { email },
        });

        if (!user) {
            return res.json({ message: "User not found", success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "Invalid password", success: false });
        }
        const token = generateToken({ id: user.id, email: user.email, role: user.role });
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        await sendMailOtp(user.email, user.name, otp);

        await prisma.bank_user.update({
            where: { id: user.id },
            data: { otp },
        });
        return res.json({
            message: "OTP sent successfully to your email",
            otp: otp,
            token,
            success: true,
        });
    } catch (error) {
        console.error("Login error:", error);
        return res
            .status(500)
            .json({ message: "Internal server error", success: false });
    }
};

export const verifyOtp = async (req: any, res: any) => {
    const { email, otp } = req.body;

    const user = await prisma.bank_user.findFirst({ where: { email, otp } });
    if (!user) {
        return res.json({ message: "Invalid OTP", success: false });
    }
    return res.json({ id: user.id, message: "Login successful", success: true });
};

export const changePass = async (req: any, res: any) => {
    const { email } = req.body;

    const findEmail = await prisma.bank_user.findFirst({ where: { email } });
    if (!findEmail) {
        return res.json({ message: "Invalid Email", success: false });
    }
    return res.json({ id: findEmail.id, message: "otp sent successful", success: true });
};

export const Register = async (req: any, res: any) => {
    const phone = req.body.phone?.toString();
    const email = req.body.email?.toString();
    const password = req.body.password?.toString();
    const confirmPassword = req.body.confirmPassword?.toString();
    const image = req.body.image?.toString();
    const name = req.body.name?.toString();


    if (!phone || !email || !password || !confirmPassword || !name) {
        return res.json({ message: "Required fields missing", success: false });
    }
    if (password !== confirmPassword) {
        return res.json({ message: "Passwords do not match", success: false });
    }

    try {
        const existingUser = await prisma.bank_user.findFirst({
            where: {
                OR: [{ phone }, { email }]
            }
        });

        if (existingUser) {
            return res.json({ message: "User already exists", success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.bank_user.create({
            data: {
                name: name,
                phone,
                email,
                password: hashedPassword,
                image: image ?? "NA",
                otp: null,
            }
        });

        return res.json({
            data: newUser,
            message: "User registered successfully",
            success: true
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

