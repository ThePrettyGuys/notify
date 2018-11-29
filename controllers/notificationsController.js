const Notifier = require('../notifier.js');
let notifier = new Notifier();

exports.subscribe = function(req, res, next ) {
    let subscriptionData = { artistId: req.body.artistId, email: req.body.email };
    try {
        //TO DO: Check artist exist on Unqfy
        notifier.addSubscriberToArtist(subscriptionData.email, subscriptionData.artistId)
        res.status(200)
    }
    catch(err){
        //TO DO
    }
};

exports.unsubscribe = function(req, res, next ) {
    let subscriptionData = { artistId: req.body.artistId, email: req.body.email };
    try {
        //TO DO: Check artist exist on Unqfy
        notifier.removeSubscriberFromArtist(subscriptionData.email, subscriptionData.artistId)
        res.status(200)
    }
    catch(err){
        //TO DO
    }
};

exports.getSubscriptions = function(req, res, next ) {
    try {
        //TO DO: Check artist exist on Unqfy
        let subscriptors = notifier.getSubscriptionsForArtist(req.query.artistId)
        res.status(200).json({
            artistId: req.query.artistId,
            subscriptors: subscriptors
        })
    }
    catch(err){
        //TO DO
    }
};

exports.deleteSubscriptions = function(req, res, next ) {
    try {
        //TO DO: Check artist exist on Unqfy
        notifier.deleteSubscriptionsForArtist(req.body.artistId)
        res.status(200);
    }
    catch(err){
        //TO DO
    }
};