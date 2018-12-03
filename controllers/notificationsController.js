const rp = require('request-promise');
const Notifier = require('../notifier.js');
let notifier = new Notifier();
let unqfyArtistURL = require('../config/endpoints').UNQFYARTISTURL;
const errorCode = require('../errorCodes');

function getByArtistId(artistId, onFulfilled,
                       onSuccess = () => {
                           return res.status(200).json();
                       },
                       onRejected = () => res.status(404).json({
                           status: 404,
                           errorCode: errorCode.RELATED_RESOURCE_NOT_FOUND
                       })
) {
    const options = {
        url: `${unqfyArtistURL}/${artistId}`,
        json: true
    };
    return rp.get(options)
        .then(onFulfilled)
        .then(onSuccess)
        .catch(onRejected);
}

exports.subscribe = function (req, res, next) {
    const artistId = req.body.artistId;
    const email = req.body.email;
    if (!artistId || !email) {
        res.status(400).json({ status: 400, errorCode: errorCode.BAD_REQUEST });
    }

    const onFulfilled = (result) => {
        return notifier.addSubscriberToArtist(artistId, email);
    };

    return getByArtistId(artistId, onFulfilled);
};

exports.unsubscribe = function (req, res, next) {
    const artistId = req.body.artistId;
    const email = req.body.email;
    if (!artistId || !email) {
        res.status(400).json({ status: 400, errorCode: errorCode.BAD_REQUEST });
    }

    const onFulfilled = (result) => {
        return notifier.removeSubscriberFromArtist(email, artistId);
    };

    return getByArtistId(artistId, onFulfilled);
};

exports.getSubscriptions = function (req, res, next) {
    let artistId = req.query.artistId;
    const onFulfilled = (result) => {
        return notifier.getSubscriptionsForArtist(artistId);
    };
    const onSuccess = (data) => {
        return res.status(200).json({ artistId: artistId, subscriptors: data });
    };

    return getByArtistId(artistId, onFulfilled, onSuccess);
};

exports.deleteSubscriptions = function (req, res, next) {
    let artistId = req.body.artistId;
    if (!artistId) {
        res.status(400).json({ status: 400, errorCode: errorCode.BAD_REQUEST });
    }

    const onFulfilled = (result) => {
        return notifier.deleteSubscriptionsForArtist(artistId);
    };

    return getByArtistId(artistId, onFulfilled);
};

exports.notify = function (req, res, next) {
    const artistId = req.body.artistId;
    const from = req.body.from;
    const subject = req.body.subject;
    const message = req.body.message;

    if (!artistId || !from || !subject || !message) {
        res.status(400).json({ status: 400, errorCode: errorCode.BAD_REQUEST });
    }
    let emailData = {
        artistId: artistId,
        from: from,
        subject: subject,
        message: message
    };

    onFulfilled = () => {
        notifier.notifySubscribersToArtist(emailData);
    };

    return getByArtistId(artistId, onFulfilled);
};
