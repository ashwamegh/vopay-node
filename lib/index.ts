'use strict'

import sha1 from 'sha1'
import format from 'date-fns/format'

const pkg = require('./../package.json')
import API from './api'

import Iq11 from './Iq11'

class VoPay {
    static VERSION = pkg.version
    Signature: string
    api: InstanceType<typeof API>
    iq11

    constructor(
        options: { ApiKey: string; ApiSecret: string; AccountID: string } = {
            ApiKey: null,
            ApiSecret: null,
            AccountID: null,
        }
    ) {
        let { ApiKey, ApiSecret, AccountID } = options

        if (!ApiKey) {
            throw new Error('`ApiKey` is mandatory')
        } else if (!ApiSecret) {
            throw new Error('`ApiSecret` is mandatory')
        } else if (!AccountID) {
            throw new Error('`AccountID` is mandatory')
        }
        this.Signature = sha1(
            `${ApiKey}${ApiSecret}${format(new Date(), 'yyyy-MM-dd')}`
        )
        this.api = new API({
            ApiKey,
            ApiSecret,
            ApiSignature: this.Signature,
            AccountID,
        })
        this.addResources()
    }

    addResources() {
        this.iq11 = Iq11(this.api)
    }
}

export default VoPay
module.exports = VoPay
