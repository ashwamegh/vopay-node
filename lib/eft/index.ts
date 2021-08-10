'use strict'

import Qs from 'querystring'

import {
	EFTFundVopayAccountRequest,
	EFTVopayTransactionResponse,
	EFTFundStatusRequest,
	EFTFundStatusResponse,
	EFTFundTransactionInfo,
	EFTWithdrawRequest,
	EFTWithdrawTransactionResponse,
	AccountTransactionResponse,
	EFTFailedTransactionsRequest,
	EFTFailedTransactionsResponse,
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
		async fundAccount(payload: EFTFundVopayAccountRequest): Promise<EFTVopayTransactionResponse> {
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

		/**
		 * This endpoint is used to take funds out of your VoPay account, and deposit them
		 * to the specified recipient’s bank account. In the below endpoint, either
		 * CompanyName OR FirstName and LastName must be provided.
		 * 
		 * If either Token, Flinks (FlinksAccountID, FlinksLoginID), Inverite 
		 * (InveriteRequestGUID), or Plaid (PlaidPublicToken/PlaidAccessToken,
		 * PlaidAccountID) is provided, then the FinancialInstitutionNumber,
		 * BranchTransitNumber, and AccountNumber will not be required.
		 * 
		 * If the bank information is provided (FinancialInstitutionNumber,
		 * BranchTransitNumber, and AccountNumber), then the Address1, City, Province,
		 * Country, and PostalCode are required.
		 */
		 async withdraw(payload: EFTWithdrawRequest): Promise<EFTVopayTransactionResponse> {
			try {
				const { data } = await api.post({
					url: '/eft/withdraw',
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
		 * This method is used to look up and return the full details on a single
		 * fund transaction. Fund transactions take money out of the customer’s bank
		 * account and deposit them into your account.
		 */
		 async getWithdrawTransactionInfo(params: EFTFundStatusRequest): Promise<EFTWithdrawTransactionResponse> {
			try {
				const { data } = await api.get({
					url: '/eft/withdraw/transaction',
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
		 * This endpoint is used to look up the status of a withdraw transaction.
		 */
		 async getWithdrawTransactionStatus(params: EFTFundStatusRequest): Promise<AccountTransactionResponse> {
			try {
				const { data } = await api.get({
					url: '/eft/withdraw/status',
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
		 * This endpoint is used to retrieve a list of transactions which failed during a
		 * specific date range. This endpoint is queried based on the date that a failure
		 * occurred on, not on the date when the transaction originally occurred.
		 */
		 async getFailedTransactions(params: EFTFailedTransactionsRequest): Promise<EFTFailedTransactionsResponse> {
			try {
				const { data } = await api.get({
					url: '/eft/failures',
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
