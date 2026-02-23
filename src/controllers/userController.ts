import prisma from '../config/db';
import bcrypt from "bcryptjs";

export const updateUser = async (req, res) => {
    const id = Number(req.body.id)
    const name = req.body.name
    const phone = req.body.phone
    const email = req.body.email
    const image = req.body.image || undefined
    const password = req.body.password

    console.log(req.body);

    if (Number(id)) {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const result = await prisma.bank_user.update({
            where: { id: Number(id) },
            data: {
                name: name, phone: phone, email: email, image: image, password: hashedPassword
            }
        });
        if (result) {
            res.json({ "message": "user successfully updated.", "success": true })
        } else {
            res.json({ "message": "Oops! An error occurred.", "success": false })
        }
    } else {
        res.json({ "message": "Required fields missing", "success": false });
    }
}

export const getUser = async (req, res) => {
    try {
        const id = req.query.id ? Number(req.query.id) : undefined;
        // console.log(req.query);

        const result = await prisma.bank_user.findMany({
            where: {
                AND: [
                    id ? { id: Number(id) } : {},
                ]
            },
            orderBy: { id: "desc" }
        });

        res.json({
            data: result,
            message: "User successfully fetched.",
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


export const deleteUser = async (req: any, res: any) => {
    try {
        const id = Number(req.query.id);
        if (!Number(id)) {
            return res.json({ message: "Required fields missing", success: false });
        }
        const student = await prisma.bank_user.findUnique({
            where: { id: Number(id) },
        });

        if (!student) {
            return res.json({ message: "user not found", success: false });
        }


        const result = await prisma.bank_user.delete({
            where: { id: Number(id) },
        });

        if (result) {
            res.json({ message: "User Deleted.", success: true });
        } else {
            res.json({ message: "Failed to delete student.", success: false });
        }

    } catch (error: any) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};