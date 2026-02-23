
import { admLogin, createAdmin, deleteAdmin, getAdmin, updateAdmin } from '../controllers/adminController';
import { Router } from 'express';

const router = Router();

router.post("/adminLogin", admLogin)
router.post("/staff", createAdmin)
router.get("/staff", getAdmin)
router.put("/staff", updateAdmin)
router.delete("/staff", deleteAdmin)




export default router;