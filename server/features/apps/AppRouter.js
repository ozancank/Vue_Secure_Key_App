import express from 'express';
import AppController from './AppController';
import { ipIsValid, ipIsUnique, nameIsUnique } from '../../middlewares';

const router = express.Router();
const appController = new AppController();

router.get('/', appController.listApps);
router.get('/:id', appController.listApp);
router.post('/', nameIsUnique, appController.createApp);
router.put('/:id', nameIsUnique, appController.updateApp);
router.get('/app-logs/:id', appController.getAppLogs);
router.get('/app-logs-date/:id', appController.getLogsByDate);
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
router.delete('/all', appController.deleteAllApps);
router.delete('/:id', appController.deleteApp);

export default router;
