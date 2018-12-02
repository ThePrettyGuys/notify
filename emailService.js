const fs = require('fs');
const promisify = require('util').promisify;
const {google} = require('googleapis');
const getGmailClient = require('./gmailClient');

const gmailClient = getGmailClient();

exports.sendEmail = function(emailData) {
    emailData.subscribers.forEach( (subscriber) => {
        gmailClient.users.messages.send(
            {
                userId: 'me',
                requestBody: {
                    raw: createMessage(emailData, subscriber),
                },
            }
        );
    });
};


function createMessage(emailData, subscriber) {
    const subject = emailData.subject;
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const messageParts = [
        'From: Unqfy <unqfy@gmail.com>',
        `To: ${subscriber} `,
        'Content-Type: text/html; charset=utf-8',
        'MIME-Version: 1.0',
        `Subject: ${utf8Subject}`,
        '',
        `${emailData.message}`,
    ];
    const message = messageParts.join('\n');

    // The body needs to be base64url encoded.
    const encodedMessage = Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    return encodedMessage;
}
