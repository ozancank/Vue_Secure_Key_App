const IP_ADDRESS_REGEX = /^(?:[0-9]{1,3}.){3}[0-9]{1,3}$/;

export const ipIsValid = (req, res, next) => {
    if (IP_ADDRESS_REGEX.test(req.body.ipAddress)) {
        next();
    } else {
        next(new Error('Lütfen ip adresi formatını doğru girin'));
    }
};
