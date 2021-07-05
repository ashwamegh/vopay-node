"use strict";

export const API_URL = "https://earthnode-dev.vopay.com/api/v2"

export function isNonNullObject(input) {
	return !!input && typeof input === "object" && !Array.isArray(input);
}

export function normalizeError(err) {
	throw {
		statusCode: err.response.status,
		error: err.response.data
	}
}