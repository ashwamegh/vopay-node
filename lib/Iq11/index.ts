'use strict'

import Qs from 'querystring'

import {
	GenerateEmbedURLFormData,
	GenerateEmbedURLFormDataResponse,
	TokenInfoRequest,
	TokenInfoResponse,
	TokenizeResponse,
	TokenizeRequest
} from '../index.d'
import API from '../api'

function Iq11(api: InstanceType<typeof API>) {
	return {
		/**
		 * This method is used to generate a unique URL to embed into your application using an iFrame. 
		 * End users will use this to log in to their online banking
		 * and select a bank account to make a payment from. 
		 * For additional details on iQ11 and RedirectMethod, please visit our Iq11 Overview
		 * https://docs.vopay.com/docs/iq11-overview
		 */
		async generateEmbedURL(
			payload: GenerateEmbedURLFormData
		): Promise<GenerateEmbedURLFormDataResponse> {
			try {
				const { data } = await api.post({
					url: '/iq11/generate-embed-url',
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
		 * This method is used to return the bank account details associated with an iQ11 Token.
		 */
		async tokenInfo(params: TokenInfoRequest): Promise<TokenInfoResponse> {
			try {
				const { data } = await api.get({
					url: '/iq11/token-info',
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

		/**
		 * This method allows you to submit bank account details, and will return a token
		 * which can be used to perform transactions using that bank account.
		 */
		async tokenize(payload: TokenizeRequest): Promise<TokenizeResponse> {
			try {
				const { data } = await api.post({
					url: '/iq11/tokenize',
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
	}
}

export default Iq11
module.exports = Iq11
