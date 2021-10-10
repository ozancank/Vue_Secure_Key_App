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
                console.log(result);
                return next(new Error(result));
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
