import express from 'express';
import AuthController from './AuthController';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const authController = new AuthController();

router.get('/auth-callback', authController.authorize);

export default router;
