import express from 'express';
import AppController from './AppController';
import { ipIsValid } from '../../middlewares';

const router = express.Router();
const appController = new AppController();

router.post('/', appController.createApp);
router.put('/:id', appController.updateApp);
router.post('/add-to-block-list/:id', ipIsValid, appController.addBlockList);
router.post('/add-to-allow-list/:id', ipIsValid, appController.addAllowList);
router.post(
    '/remove-to-allow-list/:id',
    ipIsValid,
    appController.removeAllowList
);
router.post(
    '/remove-to-block-list/:id',
    ipIsValid,
    appController.removeBlockList
);

export default router;
