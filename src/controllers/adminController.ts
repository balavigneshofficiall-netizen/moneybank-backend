
import { generateToken } from '../utils/tokenUtils';
import prisma from '../config/db';

export const admLogin = async (req: any, res: any) => {
    try {
        const phone = req.body.phone + "";
        const password = req.body.password + "";

        if (!phone || !password) {
            return res.json({ message: "Required fields missing", success: false });
        }
        const user = await prisma.bank_admin.findFirst({
            where: { phone },
        });

        if (!user) {
            return res.json({ message: "User not found", success: false });
        }
        if (user.password !== password) {
            return res.json({ message: "Invalid password", success: false });
        }
        const token = generateToken({ id: user.id, email: user.phone, role: user.role });
        const finalData = { id: user.id, name: user.name, phone: user.phone, token: token };

        return res.json({
            message: "Login successful",
            success: true,
            data: finalData
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const createAdmin = async (req, res) => {

    const name = req.body.name + ""
    const phone = req.body.phone + ""
    const password = req.body.password + ""
    console.log(req.body);

    const staff = await prisma.bank_admin.findFirst({
        where: { phone },
    });

    if (staff) {
        return res.json({ message: "staff already register", success: false });
    }
    if (!staff) {
        const result = await prisma.bank_admin.create({
            data: {
                name: name, phone: phone, password: password
            }
        });
        if (result) {
            res.json({ "message": "staff created successfully .", "success": true })
        } else {
            res.json({ "message": "Oops! An error occurred.", "success": false })
        }
    }
    else {
        res.json({ "message": "Required fields missing", "success": false });
    }
}

export const updateAdmin = async (req, res) => {
    const id = Number(req.body.id)
    const name = req.body.name
    const phone = req.body.phone
    const password = req.body.password
    console.log(req.body);

    if (Number(id)) {

        const result = await prisma.bank_admin.update({
            where: { id: Number(id) },
            data: {
                name: name, phone: phone, password: password
            }
        });
        if (result) {
            res.json({ "message": "staff successfully updated.", "success": true })
        } else {
            res.json({ "message": "Oops! An error occurred.", "success": false })
        }
    } else {
        res.json({ "message": "Required fields missing", "success": false });
    }
}

export const getAdmin = async (req, res) => {
    try {
        const staffId = req.query.staffId ? Number(req.query.staffId) : undefined;
        // console.log(req.query);

        const result = await prisma.bank_admin.findMany({
            where: {
                AND: [
                    staffId ? { id: Number(staffId) } : {},
                ]
            },
            orderBy: { id: "desc" }
        });

        res.json({
            data: result,
            message: "staff successfully fetched.",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};


export const deleteAdmin = async (req: any, res: any) => {
    try {
        const id = req.query.id ? Number(req.query.id) : undefined;
        // console.log(req.query);

        if (!Number(id)) {
            return res.json({ message: "Required fields missing", success: false });
        }
        const staff = await prisma.bank_admin.findUnique({
            where: { id: Number(id) },
        });

        if (!staff) {
            return res.json({ message: "staff not found", success: false });
        }


        const result = await prisma.bank_admin.delete({
            where: { id: Number(id) },
        });

        if (result) {
            res.json({ message: "staff Deleted.", success: true });
        } else {
            res.json({ message: "Failed to delete staff.", success: false });
        }

    } catch (error: any) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};