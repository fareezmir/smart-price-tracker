import express from 'express';

import { getUserProductsController } from '../controllers/user/getUserProductsController';

export const userRouter = express.Router();

userRouter.get('/users/:userId/products', getUserProductsController);
