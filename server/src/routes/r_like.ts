import { Router, Request, Response } from "express"

import format, { ApiResponse } from "../format"
import async_wrap from "../async_wrap"
import * as m_like from "../model/m_like"
import * as m_song from "../model/m_song"
import can from "../can"

const r_like: Router = Router()

/**
 * @route GET /api/like/:id
 * 
 */
r_like.get("/:id", async_wrap(async (req: Request, res, Result) => {
	const userid = req.session.userid

	if (!userid) return res.status(403).json(format.error("Forbidden", 403))

	const song: m_song.Song|null = await m_song.find_by_id(req.params.id)

	if (song && song.songid) {
		const result: boolean = await m_like.liked(userid, song.songid)
		res.json(format.data(result, "BOOLEAN"))
	}
	else {
		res.status(404).json(format.error("No song found", 404))
	}
}))

/**
 * @route POST /api/like/:id
 * @description toggles a like on song :id by current user
 */
r_like.post("/:id", async_wrap(async (req: Request, res: Response) => {
	const userid = req.session.userid

	if (!userid) return res.status(403).json(format.error("Forbidden", 403))

	const song: m_song.Song|null = await m_song.find_by_id(req.params.id)

	if (song && song.songid) {
		const result = await m_like.toggle(userid, song.songid)
		const action: string = result[1] ? "Like" : "Unlike"
		res.json(format.data(action, "SUCCESS", result[0]))
	}
	else {
		res.status(404).json(format.error("No song found", 404))
	}
}))

export default r_like
