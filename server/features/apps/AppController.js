import { validate } from '../../utils';
import AppModel from './AppModel';

class AppController {
    async createApp(req, res, next) {
        try {
            const { name, apiKey, description } = req.body;
            const { userid: userId } = req.headers;
            const result = validate([
                {
                    text: name || '',
                    check: ['required', 'maxLength:50'],
                    messages: [
                        'Uygulama İsmini lütfen Belirtin',
                        'Uygulama İsmi En Fazla 50 Karakter Olabilir',
                    ],
                },
                {
                    text: apiKey || '',
                    check: ['required', 'maxLength:200'],
                    messages: [
                        'Api Anahtarınızı lütfen Belirtin',
                        'Anahtar En Fazla 200 Karakter Olabilir',
                    ],
                },
                {
                    text: description || '',
                    check: ['maxLength:500'],
                    messages: ['Açıklama En Fazla 500 Karakter Olabilir'],
                },
            ]);

            if (result == true) {
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
            } else {
                return next(new Error(result));
            }
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
            const result = validate([
                {
                    text: name || '',
                    check: ['required', 'maxLength:50'],
                    messages: [
                        'Uygulama İsmini lütfen Belirtin',
                        'Uygulama İsmi En Fazla 50 Karakter Olabilir',
                    ],
                },
                {
                    text: apiKey || '',
                    check: ['required', 'maxLength:200'],
                    messages: [
                        'Api Anahtarınızı lütfen Belirtin',
                        'Anahtar En Fazla 200 Karakter Olabilir',
                    ],
                },
                {
                    text: limit || '',
                    check: ['required', 'number'],
                    messages: [
                        'Limiti lütfen Belirtin',
                        'Limit Sadece Rakamlardan Oluşmalıdır',
                    ],
                },
                {
                    text: time || '',
                    check: ['required', 'number'],
                    messages: [
                        'Süreyi lütfen Belirtin',
                        'Süre Sadece Rakamlardan Oluşmalıdır',
                    ],
                },
                {
                    text: description || '',
                    check: ['maxLength:500'],
                    messages: ['Açıklama En Fazla 500 Karakter Olabilir'],
                },
            ]);

            if (result == true) {
                const app = await AppModel.updateOne(
                    { _id },
                    {
                        name,
                        apiKey,
                        description,
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
                } else {
                    return next(new Error('Bu uygulama bulunamadı.'));
                }
            } else {
                return next(new Error(result));
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
            const add = await AppModel.updateOne(
                {
                    _id,
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
            const add = await AppModel.updateOne(
                {
                    _id,
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
            const add = await AppModel.updateOne(
                {
                    _id,
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
            const add = await AppModel.updateOne(
                {
                    _id,
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
}

export default AppController;
