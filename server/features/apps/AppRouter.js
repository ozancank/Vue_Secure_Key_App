import express from 'express';
import AppController from './AppController';
import { ipIsValid, ipIsUnique, nameIsUnique } from '../../middlewares';

const router = express.Router();
const appController = new AppController();

router.post('/', nameIsUnique, appController.createApp);
router.get('/api-service/:slug/:userId', appController.getApiKey);
router.put('/:id', nameIsUnique, appController.updateApp);
router.post(
    '/add-to-block-list/:id',
    ipIsValid,
    ipIsUnique,
    appController.addBlockList
);
router.post(
    '/add-to-allow-list/:id',
    ipIsValid,
    ipIsUnique,
    appController.addAllowList
);
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
router.delete('/:id', appController.deleteApp);

export default router;
