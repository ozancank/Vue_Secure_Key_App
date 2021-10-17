import { createLog, getAppName } from '../../utils';
import AppModel from './AppModel';
import AppLogModel from './AppLogModel';
import mongoose from 'mongoose';

class AppController {
    async createApp(req, res, next) {
        try {
            const { name, apiKey, description } = req.body;
            const { userid: userId } = req.headers;
            const app = await AppModel.create({
                name,
                apiKey,
                description,
                userId,
            });
            res.status(200).json({
                status: true,
                message: 'Uygulamanız Oluşturulmuştur.',
                app,
            });
            createLog({
                type: 'app',
                userId,
                description: `${name} adında yeni bir uygulama oluşturdunuz`,
            });
        } catch (error) {
            console.log(error);
            return next(
                new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin')
            );
        }
    }

    async listApps(req, res, next) {
        try {
            const { userid: userId } = req.headers;
            const apps = await AppModel.find({ userId });
            res.status(200).json(apps);
        } catch (error) {
            new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin');
        }
    }

    async listApp(req, res, next) {
        try {
            const { id: _id } = req.params;
            const { userid: userId } = req.headers;
            const app = await AppModel.findOne({ _id, userId });
            if (app) {
                res.status(200).json(app);
            } else {
                return next(new Error('Bu uygulama bulunamadı.'));
            }
        } catch (error) {
            new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin');
        }
    }

    async deleteApp(req, res, next) {
        try {
            const { id: _id } = req.params;
            const { userid: userId } = req.headers;
            const appName = await getAppName(_id);
            const deleteApp = await AppModel.deleteOne({ _id, userId });
            if (deleteApp.deletedCount == 1) {
                res.status(200).json({
                    status: true,
                    message: 'Uygulamanız Kaldırılmıştır.',
                });
                createLog({
                    type: 'app',
                    userId,
                    description: `${appName} uygulamasını kaldırdınız`,
                });
            } else {
                return next(new Error('Bu uygulama bulunamadı.'));
            }
        } catch (error) {
            console.log(error);
            return next(
                new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin')
            );
        }
    }

    async deleteAllApps(req, res, next) {
        try {
            const { userid: userId } = req.headers;
            const deleteApp = await AppModel.deleteMany({ userId });
            res.status(200).json({
                status: true,
                message: 'Uygulamanız Kaldırılmıştır.',
            });
            createLog({
                type: 'app',
                userId,
                description: `Bütün uygulamaları kaldırdınız`,
            });
        } catch (error) {
            console.log(error);
            return next(
                new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin')
            );
        }
    }

    async updateApp(req, res, next) {
        try {
            const { name, apiKey, description, limit, time } = req.body;
            const { id: _id } = req.params;
            const { userid: userId } = req.headers;
            const appName = await getAppName(_id);
            const oldData = await AppModel.findOne({ _id });
            const app = await AppModel.updateOne(
                { _id, userId },
                {
                    name: name ?? oldData.appName,
                    apiKey: apiKey ?? oldData.apiKey,
                    description: description ?? oldData.description,
                    limit,
                    time,
                }
            );
            if (app.matchedCount == 1) {
                res.status(200).json({
                    status: true,
                    message: 'Uygulamanız Güncellenmiştir.',
                    app,
                });
                createLog({
                    type: 'app',
                    userId,
                    description: `${appName} uygulamasını güncellediniz - (${name})`,
                });
            } else {
                return next(new Error('Bu uygulama bulunamadı.'));
            }
        } catch (error) {
            console.log(error);
            return next(
                new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin')
            );
        }
    }

    async addBlockList(req, res, next) {
        try {
            const { id: _id } = req.params;
            const { ipAddress } = req.body;
            const { userid: userId } = req.headers;
            const add = await AppModel.updateOne(
                {
                    _id,
                    userId,
                },
                {
                    $push: { blockList: ipAddress },
                }
            );
            if (add.matchedCount == 1) {
                res.status(200).json({
                    status: true,
                    message: `${ipAddress} yasaklı listesine eklendi.`,
                });
                createLog({
                    type: 'app',
                    userId,
                    description: `${ipAddress} yasaklı listeye eklediniz.`,
                });
            } else {
                return next(new Error('Bu uygulama bulunamadı.'));
            }
        } catch (error) {
            console.log(error);
            return next(
                new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin')
            );
        }
    }

    async addAllowList(req, res, next) {
        try {
            const { id: _id } = req.params;
            const { ipAddress } = req.body;
            const { userid: userId } = req.headers;
            const add = await AppModel.updateOne(
                {
                    _id,
                    userId,
                },
                {
                    $push: { allowList: ipAddress },
                }
            );
            if (add.matchedCount == 1) {
                res.status(200).json({
                    status: true,
                    message: `${ipAddress} izin verilen listesine eklendi.`,
                });
                createLog({
                    type: 'app',
                    userId,
                    description: `${ipAddress} izin verilen listeye eklediniz.`,
                });
            } else {
                return next(new Error('Bu uygulama bulunamadı.'));
            }
        } catch (error) {
            console.log(error);
            return next(
                new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin')
            );
        }
    }

    async removeBlockList(req, res, next) {
        try {
            const { id: _id } = req.params;
            const { ipAddress } = req.body;
            const { userid: userId } = req.headers;
            const add = await AppModel.updateOne(
                {
                    _id,
                    userId,
                },
                {
                    $pull: { blockList: ipAddress },
                }
            );
            if (add.matchedCount == 1) {
                res.status(200).json({
                    status: true,
                    message: `${ipAddress} yasaklı listesinden kaldırıldı.`,
                });
                createLog({
                    type: 'app',
                    userId,
                    description: `${ipAddress} yasaklı listesinden kaldırdınız.`,
                });
            } else {
                return next(new Error('Bu uygulama bulunamadı.'));
            }
        } catch (error) {
            console.log(error);
            return next(
                new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin')
            );
        }
    }

    async removeAllowList(req, res, next) {
        try {
            const { id: _id } = req.params;
            const { ipAddress } = req.body;
            const { userid: userId } = req.headers;
            const add = await AppModel.updateOne(
                {
                    _id,
                    userId,
                },
                {
                    $pull: { allowList: ipAddress },
                }
            );
            if (add.matchedCount == 1) {
                res.status(200).json({
                    status: true,
                    message: `${ipAddress} izin verilen listesinden kaldırıldı.`,
                });
                createLog({
                    type: 'app',
                    userId,
                    description: `${ipAddress} izin verilen listesinden kaldırdınız.`,
                });
            } else {
                return next(new Error('Bu uygulama bulunamadı.'));
            }
        } catch (error) {
            console.log(error);
            return next(
                new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin')
            );
        }
    }

    async getAppLogs(req, res, next) {
        try {
            const { id: appId } = req.params;
            const logs = await AppLogModel.find({ appId }).sort({
                createdAt: -1,
            });
            res.status(200).json(logs);
        } catch (error) {
            console.log(error);
            return next(
                new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin')
            );
        }
    }

    async getLogsByDate(req, res, next) {
        const { id: appId } = req.params;
        const dates = await AppLogModel.aggregate([
            {
                $match: { appId: mongoose.Types.ObjectId(appId) },
            },
            {
                $group: {
                    _id: '$date',
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(dates);
    }
}

export default AppController;
