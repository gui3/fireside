/**
 * formatting data for the api
 */
export interface ApiResponse {
	valid: boolean,
	success: boolean,
	type: string,
	data: any,
	error?: Error|string,
	[key: string]: unknown
}

export function error (err: any, status = 400, additional_keys = {})
: ApiResponse
{
	return {
		valid: true,
		success: false,
		type: "ERROR",
		data: null,
		status,
		error: err.message || err,
		...additional_keys
	}
}

export function data(data: any, type: string, success: boolean = true, additional_keys = {})
: ApiResponse
{
	return {
		valid: true,
		success,
		type,
		data,
		...additional_keys
	}
}

export default {
	data,
	error
}