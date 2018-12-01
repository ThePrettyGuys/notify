class Notifier {
    constructor() {
        this.subscribersMap = {};
    }

    addSubscriberToArtist(email, artistId){
        if (this.subscribersMap[artistId]) {
            if (this.subscribersMap[artistId].indexOf(email) === -1) {
                this.subscribersMap[artistId].push(email);
                console.log(this.subscribersMap);
            }
        } else {
            this.subscribersMap[artistId] = [email];
            console.log(this.subscribersMap);
        }
    }

    removeSubscriberFromArtist(email, artistId) {
        let index = this.subscribersMap[artistId].indexOf(email)
        if (index !== -1) {
            this.subscribersMap[artistId].splice(index, 1);
            console.log(this.subscribersMap);
        }
    }

    getSubscriptionsForArtist(artistId) {
        return this.subscribersMap[artistId];
    }

    deleteSubscriptionsForArtist(artistId) {
        delete this.subscribersMap[artistId];
    }
}

module.exports = Notifier