class Notifier {
    constructor() {
        this.subscribersMap = {};
    }

    addSubscriberToArtist(email, artistId){
        if (this.subscribersMap[artistId]) {
            if (this.subscribersMap[artistId].indexOf(email) === -1) { this.subscribersMap[artistId].push(email); }
        } else {
            this.subscribersMap[artistId] = [email];
        }
    }

    removeSubscriberFromArtist(email, artistId) {
        if (this.subscribersMap[artistId].indexOf(email) !== -1) { this.subscribersMap[artistId].remove(email); }
    }

    getSubscriptionsForArtist(artistId) {
        return this.subscribersMap[artistId];
    }

    deleteSubscriptionsForArtist(artistId) {
        delete this.subscribersMap[artistId];
    }
}

module.exports = Notifier