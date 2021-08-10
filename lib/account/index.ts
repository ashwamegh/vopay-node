'use strict'

import Qs from 'querystring'

import {
	VoPayRequest,
	VoPayResponse,
	AccountBalanceRequest,
	AccountBalanceResponse,
	AccountCancelTransactionRequest,
	AccountTransactionResponse,
	AccountWebhookURLRequest,
	AccountWebhookURLInfo,
	AccountTransferFundsResponse,
	AccountTransferFundsToRequest,
	AccountTransferFundsFromRequest,
	AccountAutoBalanceTransferSetupRequest,
	AccountAutoBalanceTransferInfo,
	AutoBalanceTransferCancellationResponse
} from '../index.d'
import API from '../api'

function Account(api: InstanceType<typeof API>) {
	return {
		/**
		 * This method returns details on your current account balance and available funds.
		 */
		async balance(
			params: AccountBalanceRequest = {}
		): Promise<AccountBalanceResponse> {
			try {
				const { data } = await api.get({
					url: '/account/balance',
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
		 * This method returns a list all of the transactions which affect the account balance.
		 * The transactions returned by this API include customer funding transactions
		 * (created by the /eft/fund endpoint), customer withdrawal transactions (created by
		 * the /eft/withdraw endpoint) and fees. This endpoint only returns basic information on
		 * the transactions. More detailed information on individual transactions is available
		 * from other API endpoints.
		 * 
		 * New optional field PayLinkStatus has been added which only accepts the values (pending,
		 * cancelled, completed) to filter the transactions with the corresponding status.
		 */
		async transactions(
			params: AccountBalanceRequest = {}
		): Promise<AccountBalanceResponse> {
			try {
				const { data } = await api.get({
					url: '/account/transactions',
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
		 * This method allows a recently created transaction to be cancelled. Once a
		 * transaction has begun being processed it can no longer be canceled through this method.
		 * 
		 * Paylink can also be cancelled using this endpoint and can only be cancelled if it is
		 * in a pending status. Once the paylink is cancelled successfully, the cancellation
		 * email will be sent to the recipient as a cancellation confirmation.
		 */
		async cancelTransaction(
			payload: AccountCancelTransactionRequest
		): Promise<AccountTransactionResponse> {
			try {
				const { data } = await api.post({
					url: '/account/transactions/cancel',
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
		 * This method will allow the user to modify the webhook URL.
		 * 
		 * The purpose of the webhook URL is to notify users of any changes in
		 * transaction status. If your transaction has been approved or changes
		 * status, we will notify you about that change.
		 * 
		 * Currently, our webhooks are linked only to changes in the transaction status
		 * (not creation). This functionality will be expanded in future versions.
		 */
		async setWebhookURL(
			payload: AccountWebhookURLRequest = {}
		): Promise<VoPayResponse> {
			try {
				const { data } = await api.post({
					url: '/account/webhook-url',
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
		 * This endpoint will retrieve your webhook URL.
		 */
		async getWebhookURL(
			params: VoPayRequest = {}
		): Promise<AccountWebhookURLInfo> {
			try {
				const { data } = await api.get({
					url: '/account/webhook-url/info',
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
		 * In this endpoint, you will be able to test your webhook URL.
		 * We will send you an example of the payload that you will receive.
		 */
		 async testWebhookURL(
			params: VoPayRequest = {}
		): Promise<VoPayResponse> {
			try {
				const { data } = await api.get({
					url: '/account/webhook-url/test',
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
		 * This method allows you to transfer funds between VoPay accounts.
		 */
		async transferAccountFundsTo(
			payload: AccountTransferFundsToRequest
		): Promise<AccountTransferFundsResponse> {
			try {
				const { data } = await api.post({
					url: '/account/transfer-to',
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
		 * This method allows you to transfer funds from a pre-authorized VoPay account to your VoPay account.
		 */
		async transferAccountFundsFrom(
			payload: AccountTransferFundsFromRequest
		): Promise<AccountTransferFundsResponse> {
			try {
				const { data } = await api.post({
					url: '/account/transfer-from',
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
		 * This method allows you to set up an auto-balance transfer from your VoPay
		 * account to your linked bank account. The frequency available to set the
		 * auto-transfer can be daily, weekly, bi-weekly or monthly.
		 * 
		 * This option requires special permission.
		 */
		async setupAutoBalanceTransfer(
			payload: AccountAutoBalanceTransferSetupRequest
		): Promise<VoPayResponse> {
			try {
				const { data } = await api.post({
					url: '/account/auto-balance-transfer',
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
		 * This method is used to retrieve the information of your auto balance transfer.
		 * 
		 * This option requires special permissions.
		 */
		async getAutoBalanceTransferInfo(
			params: VoPayRequest = {}
		): Promise<AccountAutoBalanceTransferInfo> {
			try {
				const { data } = await api.get({
					url: '/account/auto-balance-transfer',
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
		 * This method allows you to cancel an auto balance transfer.
		 * 
		 * This option requires special permissions.
		 */
		 async cancelAutoBalanceTransfer(
			payload: VoPayRequest
		): Promise<AutoBalanceTransferCancellationResponse> {
			try {
				const { data } = await api.post({
					url: '/account/auto-balance-transfer',
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

export default Account
module.exports = Account
