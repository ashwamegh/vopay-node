'use strict'

import Axios from 'axios'
import { API_URL, normalizeError } from './helpers/constants'

export default class API {
	client: any
	AccountID: string
	Key: string
	Secret: string
	Signature: string

	constructor(
		options: {
			ApiKey: string
			ApiSecret: string
			ApiSignature: string
			AccountID: string
		} = {
			ApiKey: null,
			ApiSecret: null,
			ApiSignature: null,
			AccountID: null,
		}
	) {
		this.client = Axios.create({
			baseURL: API_URL,
			headers: Object.assign({
				accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Cache-Control': 'no-cache',
			}),
		})

		this.Key = options.ApiKey
		this.Secret = options.ApiSecret
		this.Signature = options.ApiSignature
		this.AccountID = options.AccountID
	}

	async get(params: { url: string; queryString: object }) {
		try {
			const data = await this.client.get(params.url, {
				params: params.queryString,
			})
			return data
		} catch (error) {
			return normalizeError(error)
		}
	}

	async post(params: { url: string; data: any }) {
		try {
			return await this.client.post(params.url, params.data)
		} catch (error) {
			return normalizeError(error)
		}
	}

	commonPayload() {
		return {
			AccountID: this.AccountID,
			Key: this.Key,
			Signature: this.Signature,
		}
	}
}
