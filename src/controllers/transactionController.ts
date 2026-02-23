import { PrismaClient } from "@prisma/client";
import moment from 'moment-timezone'
const prisma = new PrismaClient();

export const createTransaction = async (req: any, res: any) => {
    try {

        const userId = Number(req.body.userId)
        const categoryId = Number(req.body.categoryId)
        const amount = Number(req.body.amount)
        const mode = req.body.mode + ""
        const description = req.body.description + ""
        const time = req.body.time + ""

        if (!userId || !categoryId || !mode || !amount || !time) {
            return res.json({ message: "Required fields missing", success: false });
        }

        const transaction = await prisma.bank_transaction.create({
            data: {
                userId: Number(userId),
                categoryId: Number(categoryId),
                mode,
                amount: Number(amount),
                description,
                time,
            },
        });

        res.json({ data: transaction, message: "Transaction created successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const getAllTransactions = async (req: any, res: any) => {
    const id = Number(req.query.id)
    try {
        const transactions = await prisma.bank_transaction.findMany({
            where: id ? { id: id } : {},
            include: { user: true, category: true },
            orderBy: { id: "desc" },
        });
        const finalResult = transactions.map((val) => ({
            ...val,
            date: val.date ? moment(val.date).format("DD-MM-YYYY") : null,
            name: val?.user?.name,
            phone: val?.user?.phone,
            email: val?.user?.email,
            image: val?.user?.image,
            categoryName: val.category?.name,
            user: undefined, category: undefined
        }));
        res.json({ data: finalResult, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const getTransactions = async (req: any, res: any) => {
    const id = Number(req.query.userId)
    const mode = (req.query.mode || "").toUpperCase();
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    const today = req.query.today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);


    console.log(today, "today");


    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    let from = moment.tz(isNaN(new Date(startDate + "").getTime()) ? new Date(startDate + "".split("-").join("-"))
        : new Date(startDate + ""), "Asia/Kolkata").format("YYYY-MM-DD 00:00:00");

    let to = moment.tz(isNaN(new Date(endDate + "").getTime()) ? new Date(endDate + "".split("-").join("-"))
        : new Date(endDate + ""), "Asia/Kolkata").format("YYYY-MM-DD 23:59:59");

    if ((startDate && !from) || (endDate && !to)) {
        return res.status(400).json({ message: "Invalid date format", success: false });
    }
    console.log(mode);
    console.log("startDate", startDate, "endDate", endDate);


    if (!id) {
        return res.json({ message: "userId is missing", success: false });
    }
    try {
        const transactions = await prisma.bank_transaction.findMany({
            where: {
                AND: [
                    id ? { userId: id } : {},
                    mode === "CREDIT" ? { mode: "CREDIT" } : mode === "DEBIT" ? { mode: "DEBIT" } : {},
                    (startDate && endDate) ? { date: { gte: new Date(from), lte: new Date(to) } } :
                        startDate ? { date: { gte: new Date(from) } } :
                            endDate ? { date: { lte: new Date(to) } }
                                : today == "true" ? { date: { gte: todayStart, lte: todayEnd } } : {}
                ]
            },
            include: { user: true, category: true },
            orderBy: { id: "desc" },
        });
        const finalResult = transactions.map((val) => ({
            ...val,
            date: val.date ? moment(val.date).format("DD-MM-YYYY") : null,
            name: val?.user?.name,
            phone: val?.user?.phone,
            email: val?.user?.email,
            image: val?.user?.image,
            categoryName: val.category?.name,
            user: undefined, category: undefined
        }));
        res.json({ data: finalResult, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const updateTransaction = async (req: any, res: any) => {
    try {
        const id = Number(req.query.id);
        const { mode, amount, description, time } = req.body;

        const updated = await prisma.bank_transaction.update({
            where: { id },
            data: { mode, amount: Number(amount), description, time },
        });

        res.json({ data: updated, message: "Transaction updated successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};


export const deleteTransaction = async (req: any, res: any) => {
    try {
        const id = Number(req.query.id);
        await prisma.bank_transaction.delete({ where: { id } });
        res.json({ message: "Transaction deleted successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};
