const Notifier = require('../notifier.js');
let notifier = new Notifier();
let unqfyURL = "http://localhost:3000/api/artists";
const rp = require('request-promise');

exports.subscribe = function (req, res, next) {
    if(!req.body.artistId || !req.body.email){ res.status(400).json({status: 400, errorCode: "BAD_REQUEST"}) }
    let subscriptionData = {artistId: req.body.artistId, email: req.body.email};
    const options = {
        url: `${unqfyURL}/${req.body.artistId}`,
        json: true,
    };
    return rp.get(options)
        .then((result) => {
            return notifier.addSubscriberToArtist(subscriptionData.email, subscriptionData.artistId);
        })
        .then( () => { return res.status(200).json() } )
        .catch(() => res.status(404).json({status: 404, errorCode: "RELATED_RESOURCE_NOT_FOUND"}))
};


exports.unsubscribe = function(req, res, next ) {
    if(!req.body.artistId || !req.body.email){ res.status(400).json({status: 400, errorCode: "BAD_REQUEST"}) }
    let subscriptionData = {artistId: req.body.artistId, email: req.body.email};
    const options = {
        url: `${unqfyURL}/${req.body.artistId}`,
        json: true,
    };
    return rp.get(options)
        .then((result) => {
            return notifier.removeSubscriberFromArtist(subscriptionData.email, subscriptionData.artistId);
        })
        .then( () => { return res.status(200).json() } )
        .catch(() => res.status(404).json({status: 404, errorCode: "RELATED_RESOURCE_NOT_FOUND"}))
};

exports.getSubscriptions = function(req, res, next ) {
    let artistId = req.query.artistId;
    const options = {
        url: `${unqfyURL}/${artistId}`,
        json: true,
    };
    return rp.get(options)
        .then((result) => {
            return notifier.getSubscriptionsForArtist(artistId);
        })
        .then( (data) => { return res.status(200).json({ artistId: artistId, subscriptors: data}) } )
        .catch(() => res.status(404).json({status: 404, errorCode: "RELATED_RESOURCE_NOT_FOUND"}))
};

exports.deleteSubscriptions = function(req, res, next ) {
    if(!req.body.artistId){ res.status(400).json({status: 400, errorCode: "BAD_REQUEST"}) }
    let artistId = req.body.artistId;
    const options = {
        url: `${unqfyURL}/${artistId}`,
        json: true,
    };
    return rp.get(options)
        .then((result) => {
            return notifier.deleteSubscriptionsForArtist(artistId);
        })
        .then( () => { return res.status(200).json() } )
        .catch(() => res.status(404).json({status: 404, errorCode: "RELATED_RESOURCE_NOT_FOUND"}))
};
