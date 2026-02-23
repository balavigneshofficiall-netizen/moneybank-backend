import prisma from '../config/db';

export const createCategory = async (req: any, res: any) => {
    try {
        const name = req.body.name + "";
        if (!name) {
            return res.json({ message: "Required fields missing", success: false });
        }
        const category = await prisma.bank_category.findFirst({
            where: { name },
        });

        if (!category) {
            const result = await prisma.bank_category.create({
                data: { name: name + "" },
            });

            return res.status(201).json({
                message: "category created successfully",
                success: true,
                data: result,
            });
        }

    } catch (error) {
        console.error("category created error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};



export const updateCategory = async (req, res) => {
    const id = Number(req.body.id)
    const name = req.body.name

    console.log(req.body);

    if (Number(id)) {

        const result = await prisma.bank_category.update({
            where: { id: Number(id) },
            data: {
                name: name
            }
        });
        if (result) {
            res.json({ "message": "category successfully updated.", "success": true })
        } else {
            res.json({ "message": "Oops! An error occurred.", "success": false })
        }
    } else {
        res.json({ "message": "Required fields missing", "success": false });
    }
}

export const getCategory = async (req, res) => {
    try {
        const id = req.query.id ? Number(req.query.id) : undefined;
        const result = await prisma.bank_category.findMany({
            where: {
                id: id ? Number(id) : {}
            },
            orderBy: { id: "desc" }
        });
        res.json({
            data: result,
            message: "category successfully fetched.",
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


export const deleteCategory = async (req: any, res: any) => {
    try {
        const id = req.query.id ? Number(req.query.id) : undefined;
        if (!Number(id)) {
            return res.json({ message: "Required fields missing", success: false });
        }
        const category = await prisma.bank_category.findUnique({
            where: { id: Number(id) },
        });

        if (!category) {
            return res.json({ message: "category not found", success: false });
        }

        const result = await prisma.bank_category.delete({
            where: { id: Number(id) },
        });

        if (result) {
            res.json({ message: "category Deleted.", success: true });
        } else {
            res.json({ message: "Failed to delete category.", success: false });
        }

    } catch (error: any) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};