import { deleteUser, getUser, updateUser } from '../controllers/userController';
import { Router } from 'express';
const router = Router();

router.put("/user", updateUser)
router.get("/user", getUser)
router.delete("/user", deleteUser)

export default router;