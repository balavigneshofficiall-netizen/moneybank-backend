import { authentication } from '../middleware/authMiddleware';
import { createCategory, deleteCategory, getCategory, updateCategory } from '../controllers/categoryController';
import { Router } from 'express';
const router = Router();

router.post("/category", createCategory)
router.get("/category", getCategory)
router.put("/category", updateCategory)
router.delete("/category", deleteCategory)

export default router;
