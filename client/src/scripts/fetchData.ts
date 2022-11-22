import log from "./log";

export default async function fetchData(path: string, init?: RequestInit) {
	const visiblePath = path.replace("/api/", "")

	try {
		log.debug("fetching " + visiblePath)
		const res = await fetch(path, init)
		const json = await res.json()
		return json
	}
	catch (error: any) {
		log.error("failed fetching " + visiblePath, error)
		return {
			valid: false,
			path,
			data: null,
			error: error.message
		}
	}

}