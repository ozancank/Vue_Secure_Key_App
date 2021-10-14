import AppLogModel from '../apps/AppLogModel';
import { getIpLocation } from '../../utils';
import publicIp from 'public-ip';

class RequestController {
    async getApiKey(req, res, next) {
        const ipAdress = await publicIp.v4();
        res.status(200).json({ apiKey: req.api.apiKey });
        const ipLocation = await getIpLocation(ipAdress);
        AppLogModel.create({ ipAdress, ipLocation, appId: req.api._id });
    }
}

export default RequestController;
