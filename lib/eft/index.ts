'use strict'

import Qs from 'querystring'

import {
	EFTFundVopayAccountRequest,
	EFTFundVopayAccountResponse,
	EFTFundStatusRequest,
	EFTFundStatusResponse,
	EFTFundTransactionInfo,
} from '../index.d'
import API from '../api'

function EFT(api: InstanceType<typeof API>) {
	return {

		/**
		 * This method is used to fund your VoPay account by debiting funds from the 
		 * specified customer’s bank account. In the endpoint below, either CompanyName
		 * OR FirstName and LastName must be provided.
		 * 
		 * If either Token, Flinks (FlinksAccountID, FlinksLoginID), Inverite (InveriteRequestGUID), or
		 * Plaid (PlaidPublicToken/PlaidAccessToken, PlaidAccountID) is provided, the FinancialInstitutionNumber,
		 * BranchTransitNumber, and AccountNumber will not be required.
		 * 
		 * If the bank information is provided (FinancialInstitutionNumber, BranchTransitNumber,
		 * and AccountNumber), then the Address1, City, Country, and PostalCode and Province are required.
		 */
		async fundAccount(payload: EFTFundVopayAccountRequest): Promise<EFTFundVopayAccountResponse> {
			try {
				const { data } = await api.post({
					url: '/eft/fund',
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
		 * This method is used to look up the status of a fund transaction.
		 */
		 async getFundTransactionStatus(params: EFTFundStatusRequest): Promise<EFTFundStatusResponse> {
			try {
				const { data } = await api.get({
					url: '/eft/fund/status',
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
		 * This method is used to look up and return the full details on a single
		 * fund transaction. Fund transactions take money out of the customer’s bank
		 * account and deposit them into your account.
		 */
		 async getFundTransactionInfo(params: EFTFundStatusRequest): Promise<EFTFundTransactionInfo> {
			try {
				const { data } = await api.get({
					url: '/eft/fund/transaction',
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

export default EFT
module.exports = EFT
