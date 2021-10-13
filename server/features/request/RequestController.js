class RequestController {
    async getApiKey(req, res, next) {
        res.status(200).json({ apiKey: req.api });
    }
}

export default RequestController;
