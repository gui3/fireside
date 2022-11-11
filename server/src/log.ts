export function date_string (date: Date|undefined = undefined): string {
	if (!date) date = new Date()
	return date.toISOString()
}

export function info (data: any) {
	console.log(date_string() + "> " + data)
}

export function debug (data: any) {
	if (process.env.NODE_ENV !== "production") info(data)
}

export function error (data: any) {
	info("An error has occured:")
	console.error(data)
}

export default {
	info,
	debug,
	error
}