let emailService = require('./emailService');

class Notifier {
    constructor() {
        this.subscribersMap = {};
    }

    addSubscriberToArtist(artistId, email){
        if (this.subscribersMap[artistId]) {
            if (this.subscribersMap[artistId].indexOf(email) === -1) {
                this.subscribersMap[artistId].push(email);
            }
        } else {
            this.subscribersMap[artistId] = [email];
        }
    }

    removeSubscriberFromArtist(email, artistId) {
        let index = this.subscribersMap[artistId].indexOf(email);
        if (index !== -1) {
            this.subscribersMap[artistId].splice(index, 1);
        }
    }

    getSubscribersForArtist(artistId) {
        return this.subscribersMap[artistId];
    }

    deleteSubscriptionsForArtist(artistId) {
        delete this.subscribersMap[artistId];
    }

    notifySubscribersToArtist(emailData) {
        let subscribers = this.getSubscribersForArtist(emailData.artistId);
        console.log(`La lista de subscriptores para ${emailData.artistId} es: ${subscribers}`);
        emailService.sendEmail(subscribers, emailData);
    }
}

module.exports = Notifier;