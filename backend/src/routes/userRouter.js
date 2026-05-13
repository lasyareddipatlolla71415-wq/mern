import { Router } from 'express';
import { getMe } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const userRouter = Router();

userRouter.get('/me', protect, getMe);

export default userRouter;
