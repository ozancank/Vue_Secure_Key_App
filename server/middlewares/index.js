import AppModel from '../features/apps/AppModel';
import { validate } from '../utils';

const IP_ADDRESS_REGEX = /^(?:[0-9]{1,3}.){3}[0-9]{1,3}$/;

export const ipIsValid = (req, res, next) => {
    req.type =
        req.url.split('/')[1] == 'add-to-block-list'
            ? 'blockList'
            : 'allowList';
    if (IP_ADDRESS_REGEX.test(req.body.ipAddress)) {
        next();
    } else {
        next(new Error('Lütfen ip adresi formatını doğru girin'));
    }
};

export const ipIsUnique = async (req, res, next) => {
    const { ipAddress } = req.body;
    const { id: _id } = req.params;
    const ipIsExist = await AppModel.findOne().or([
        {
            _id,
            blockList: { $in: [ipAddress] },
        },
        {
            _id,
            allowList: { $in: [ipAddress] },
        },
    ]);
    if (!ipIsExist) {
        next();
    } else {
        const name = ipIsExist.blockList.includes(ipAddress)
            ? 'Yasaklı Listesine'
            : 'İzin Verilen Listesine';
        next(new Error(`Bu ip adresini ${name} kayıt etmişsiniz`));
    }
};

export const nameIsUnique = async (req, res, next) => {
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
        const checkName = await AppModel.findOne({ name, userId });
        if (!checkName) {
            next();
        } else {
            next(new Error('Bu isimde bir uygulama oluşturmuşsunuz.'));
        }
    } else {
        next(new Error(result));
    }
};
