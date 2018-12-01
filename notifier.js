class Notifier {
    constructor() {
        this.subscribersMap = {};
    }

    addSubscriberToArtist(email, artistId){
        if (this.subscribersMap[artistId]) {
            if (this.subscribersMap[artistId].indexOf(email) === -1) {
                this.subscribersMap[artistId].push(email);
            }
        } else {
            this.subscribersMap[artistId] = [email];
        }
    }

    removeSubscriberFromArtist(email, artistId) {
        let index = this.subscribersMap[artistId].indexOf(email)
        if (index !== -1) {
            this.subscribersMap[artistId].splice(index, 1);
        }
    }

    getSubscriptionsForArtist(artistId) {
        return this.subscribersMap[artistId];
    }

    deleteSubscriptionsForArtist(artistId) {
        delete this.subscribersMap[artistId];
    }

    notifySubscribersToArtist(emailData) {
        let subscribers = this.getSubscriptionsForArtist(emailData.artistId);
        emailData['subscribers'] = subscribers;
        console.log(emailData);
    }
}

module.exports = Notifier;