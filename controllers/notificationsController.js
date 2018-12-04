const rp = require('request-promise');
const Notifier = require('../notifier.js');
let notifier = new Notifier();
let unqfyArtistURL = require('../config/endpoints').UNQFYARTISTURL;
const errorCode = require('../errorCodes');

function getByArtistId(artistId, onFulfilled, onSuccess, onRejected) {
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
        return
    }

    const onFulfilled = (result) => {
        return notifier.addSubscriberToArtist(artistId, email);
    };

    const onSuccess = () => {
        console.log(`El mail: ${email} se ha subscripto al artista de id: ${artistId}`);
        return res.status(200).json();
    };

    const onRejected = () => res.status(404).json({
        status: 404,
        errorCode: errorCode.RELATED_RESOURCE_NOT_FOUND
    });

    return getByArtistId(artistId, onFulfilled, onSuccess, onRejected);
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

    const onSuccess = () => {
        return res.status(200).json();
    };

    const onRejected = () => res.status(404).json({
        status: 404,
        errorCode: errorCode.RELATED_RESOURCE_NOT_FOUND
    });

    return getByArtistId(artistId, onFulfilled, onSuccess, onRejected);
};

exports.getSubscriptions = function (req, res, next) {
    let artistId = req.query.artistId;
    const onFulfilled = () => {
        const subscriptionsForArtist = notifier.getSubscriptionsForArtist(artistId);
        console.log(`obtengo las subscripciones: ${subscriptionsForArtist}`);
        return subscriptionsForArtist;
    };
    const onSuccess = (data) => {
        console.log('obteniendo las subscriociones: ' + data);
        return res.status(200).json({ artistId: artistId, subscriptors: data });
    };

    const onRejected = () => res.status(404).json({
        status: 404,
        errorCode: errorCode.RELATED_RESOURCE_NOT_FOUND
    });

    return getByArtistId(artistId, onFulfilled, onSuccess, onRejected);
};

exports.deleteSubscriptions = function (req, res, next) {
    let artistId = req.body.artistId;
    if (!artistId) {
        res.status(400).json({ status: 400, errorCode: errorCode.BAD_REQUEST });
    }

    const onFulfilled = (result) => {
        return notifier.deleteSubscriptionsForArtist(artistId);
    };

    const onSuccess = () => {
        return res.status(200).json();
    };

    const onRejected = () => res.status(404).json({
        status: 404,
        errorCode: errorCode.RELATED_RESOURCE_NOT_FOUND
    });

    return getByArtistId(artistId, onFulfilled, onSuccess, onRejected);
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

    const onFulfilled = () => {
        notifier.notifySubscribersToArtist(emailData);
    };

    const onSuccess = () => {
        return res.status(200).json();
    };

    const onRejected = () => res.status(404).json({
        status: 404,
        errorCode: errorCode.RELATED_RESOURCE_NOT_FOUND
    });

    return getByArtistId(artistId, onFulfilled, onSuccess, onRejected);
};
