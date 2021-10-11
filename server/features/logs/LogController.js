import LogModel from './LogModel';

class LogController {
    async getLogs(req, res) {
        const { userid: userId } = req.headers;
        const limit =
            req.query.limit != 'all' ? Number(req.query.limit) : 'all';
        const logs = await LogModel.find({ userId })
            .limit(limit && limit != 'all' ? limit : null)
            .sort({ createdAt: -1 });
        res.status(200).json(logs);
    }

    async removeAllLogs(req, res) {
        const { userid: userId } = req.headers;
        const deleteAll = await LogModel.deleteMany({ userId });
        console.log(deleteAll);
        if (deleteAll.deletedCount > 0) {
            res.status(200).json({ message: 'Geçmiş Kayıtları Silinmiştir' });
        }
    }
}

export default LogController;
