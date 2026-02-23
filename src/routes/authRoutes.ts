import { Router } from 'express';
import { login, Register, verifyOtp } from '../controllers/authController';
const router = Router();

router.post("/login", login)
router.post("/register", Register)
router.post("/sendotp", verifyOtp)

export default router;
