
import { adminOnly, authentication } from '../middleware/authMiddleware';
import { createTransaction, deleteTransaction, getAllTransactions, updateTransaction, getTransactions } from '../controllers/transactionController';
import { Router } from 'express';
const router = Router();

router.get("/alltransaction", authentication, adminOnly, getAllTransactions)
router.get("/transaction", getTransactions)
router.post("/transaction", createTransaction)
router.put("/transaction", updateTransaction)
router.delete("/transaction", deleteTransaction)

export default router;
