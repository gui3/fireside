import {Router, Request, Response} from "express"

import format from "../format"

const r_doc: Router = Router()

function get_routes (item: any, prefix: string = ""): Array<any> {
	let routes: Array<Object> = []
	prefix += (item.path || "")

	if (item.route) {
		for (let route of item.route.stack) {
			routes.push({
				route: prefix + item.route.path,
				method: route.method
			})
		}
	}
	if (item.name === "router") {
		console.log(prefix, item)
		for (let middleware of item.handle.stack) {
			routes = routes.concat(get_routes(middleware, prefix))
		}
	}

	return routes
}

r_doc.all("/doc", async (req: Request, res: Response) => {
	let routes: Array<Object> = []

	for (let middleware of res.app._router.stack) {
		routes = routes.concat(get_routes(middleware, ""))
	}

	res.json(format.data(routes, "ROUTES"))
})

export default r_doc