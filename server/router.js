import express from 'express';
import AuthRouter from './features/auth/AuthRouter';
import AppRouter from './features/apps/AppRouter';
import LogRouter from './features/logs/LogRouter';
import cors from 'cors';

const router = express.Router();

router.use('/auth', cors({ origin: 'http://localhost:8080' }), AuthRouter);
router.use('/app', cors({ origin: 'http://localhost:8080' }), AppRouter);
router.use('/log', cors({ origin: 'http://localhost:8080' }), LogRouter);

export default router;
