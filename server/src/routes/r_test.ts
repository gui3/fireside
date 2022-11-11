import {Router, Request, Response} from "express"

import can from "../can"
import format from "../format"

const r_test: Router = Router()

r_test.all("/", async (req: Request, res: Response) => {
	const result = await can(req.session.userid || "", "create_song")
	res.json(format.data(result, "TEST"))
})

export default r_test