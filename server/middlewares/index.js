import AppModel from '../features/apps/AppModel';
import { validate } from '../utils';
import publicIp from 'public-ip';

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
    const id = req.params.id;
    const { userid: userId } = req.headers;
    const result = validate([
        {
            text: name || '',
            check: ['required', 'maxLength:50'],
            messages: [
                'Uygulama İsmini Lütfen Belirtin',
                'Uygulama İsmi En Fazla 50 Karakter Olabilir',
            ],
        },
        {
            text: apiKey || '',
            check: ['required', 'maxLength:200'],
            messages: [
                'Api Anahtarınızı Lütfen Belirtin',
                'Anahtar En Fazla 200 Karakter Olabilir',
            ],
        },
        {
            text: description || '',
            check: ['maxLength:500'],
            messages: ['Açıklama En Fazla 500 Karakter Olabilir'],
        },
    ]);

    if (!name && !apiKey && !description) {
        next();
        return;
    }

    if (result == true) {
        const check = await AppModel.findOne({ name, userId });
        if (!check) {
            next();
        } else {
            if (id && check._id.toString() == id) {
                next();
            } else {
                next(new Error('Bu isimde bir uygulama oluşturmuşsunuz.'));
            }
        }
    } else {
        next(new Error(result));
    }
};

let requestList = [];
export const apiControl = async (req, res, next) => {
    const { slug, userId } = req.params;
    const api = await AppModel.findOne({ slug, userId });
    if (api) {
        const ipAddress = await publicIp.v4();
        const { time, limit, blockList, allowList, _id } = api;
        const request = requestList.filter((item) => item == _id);
        if (request.length > limit) {
            next(new Error('Lütfen daha sonra tekrar deneyin'));
            setTimeout(() => {
                requestList = requestList.filter((item) => item != _id);
                console.log('clear!');
            }, time);
        } else {
            if (allowList.length) {
                if (allowList.includes(ipAddress)) {
                    req.api = api;
                    requestList.push(_id.toString());
                    next();
                } else {
                    next(new Error('Bu servise erişim izniniz yok.'));
                }
            } else {
                if (blockList.includes(ipAddress)) {
                    next(new Error('Bu servise erişim izniniz yok.'));
                } else {
                    req.api = api;
                    requestList.push(_id.toString());
                    next();
                }
            }
        }
    } else {
        next(new Error('Böyle bir servis bulunamadı'));
    }
};
