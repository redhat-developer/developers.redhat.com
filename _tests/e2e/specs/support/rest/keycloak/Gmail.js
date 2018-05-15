const wait = require('asyncawait/await');
const imap = require('imap-simple');

class GetMail {
    /**
     * @constructor
     */
    constructor() {
        /**
         * Imap connector instance
         * @private
         */
        this.imapConnection_ = null;
    }

    /**
     * Main function, returns email id and body
     */
    process(emailAddress) {
        let mailConfig = {
            imap: {
                user: 'uk.redhat.test01.user@gmail.com',
                password: '$tumpjumperRedH@tTe$t01',
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                authTimeout: 3000
            }
        };

        try {
            this.imapConnection_ = wait(imap.connect(mailConfig));
            let email = this._getEmail(emailAddress);

            if (email !== null) {
                let confirmationLink = email[0]['body'];
                let emailLink;
                let urlRegex = /(https?:\/\/[^\s]+)/g;
                confirmationLink.replace(urlRegex, function (url) {
                    emailLink = url
                });
                this._deleteEmail(email[0]['uid']);
                return emailLink
            } else {
                throw new Error('Timed out waiting for email to arrive')
            }
        } finally {
            this.imapConnection_.end();
        }
    }

    /**
     * @return {array<object>}
     * @param emailAddress  - email address to search for
     * @private
     */
    _getEmail(emailAddress) {
        wait(this.imapConnection_.openBox('INBOX'));
        return this._searchForEmail(emailAddress);
    }

    _searchForEmail(emailAddress) {
        let email = null;
        let checkCount = 0;

        do {
            this._sleep(1000);
            email = this._search(emailAddress);
            console.log('waiting for email . . .');
            checkCount++;
        }
        while (email === null && checkCount < 70);

        return email;
    }


    _search(emailAddress) {
        let fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
            markSeen: false,
            struct: true
        };
        let emails = wait(this.imapConnection_.search([['UNSEEN'], ['TO', emailAddress]], fetchOptions));
        let mapped_emails = emails.map(email => {
            return {
                uid: email.attributes.uid,
                from: email.parts[1].body.from[0],
                body: this._getEmailBody(email)
            };
        });
        return mapped_emails.length === 0 ? null : mapped_emails;
    }

    /**
     * Get email body
     * @private
     * @param  {Object} email
     * @return {string}
     */
    _getEmailBody(email) {
        /** Get email parts from email header **/
        let emailParts = imap.getParts(email.attributes.struct);

        /** Get email body part to parse **/
        let content = wait(this.imapConnection_.getPartData(
            email, emailParts[0]
        ));

        return wait(content.toString('utf8'));
    }


    /**
     * @param {array<number>} emailID - email's uid
     * @private
     */
    _deleteEmail(emailID) {
        try {
            this.imapConnection_.moveMessage(parseInt(emailID), '[Gmail]/Trash');
        } catch (e) {
            throw `Failed to delete email. ${e}`;
        }
    }


    /**
     * Custom delay method
     * @param {array<number>} delay - delat time (milliseconds)
     * @private
     */
    _sleep(delay) {
        let start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }
}
module.exports = GetMail;
