'use strict'

import Qs from 'querystring'

import {
	NewUserAccountRequest,
	NewUserAccountResponse,
	PartnerAccountLists,
	VoPayRequest
} from '../index.d'
import API from '../api'

function Partner(api: InstanceType<typeof API>) {
	return {

		/**
		 * This endpoint is used to create a VoPay account. You will need to sign-up as a
		 * partner account in order to use this endpoint and start creating VoPay accounts for your users.
		 * 
		 * This Endpoint does not mark the account as active, you will need to submit the rest
		 * of the required information in the POST /account/submit-extended-info endpoint
		 */
		async createUserAccount(payload: NewUserAccountRequest): Promise<NewUserAccountResponse> {
			try {
				const { data } = await api.post({
					url: '/partner/account',
					data: Qs.stringify({
						...payload,
						...api.commonPayload()
					}),
				})
				return data
			} catch (error) {
				throw error
			}
		},

		/**
		 * This endpoint is used to get a list of accounts created using a
		 * partner account. It will return the accounts data including
		 * shareholder, signing authority and balance information
		 */
		 async accountLists(params: VoPayRequest): Promise<PartnerAccountLists> {
			try {
				const { data } = await api.get({
					url: '/partner/account',
					queryString: {
						...params,
						...api.commonPayload()
					},
				})
				return data
			} catch (error) {
				throw error
			}
		},
	}
}

export default Partner
module.exports = Partner
