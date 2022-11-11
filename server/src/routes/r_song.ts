import { Router, Request, Response } from "express"

import format, { ApiResponse } from "../format"
import async_wrap from "../async_wrap"
import * as m_song from "../model/m_song"
import can from "../can"

const r_song: Router = Router()

/**
 * @route GET /api/song?search=<string>
 * @description
 * list all songs filtered by "search" if any
 */
r_song.get("/", async_wrap(async (req: Request, res: Response) => {
	const search = String(req.query.search || "")
	const songs: Array<m_song.Song> = await m_song.list(search)

	res.json(format.data(songs, "SONGS"))
}))

/**
 * @route GET /api/song/:id
 * @description
 * see one song
 */
r_song.get("/:id", async_wrap(async (req: Request, res: Response) => {
	const song: m_song.Song|null = await m_song.find_by_id(req.params.id)
	
	if (song) res.json(format.data(song, "SONG"))
	else res.status(404).json(format.error("No song found", 404))
}))

/**
 * add one song
 */
r_song.post("/", async_wrap(async (req: Request, res: Response) => {
	const authorized: boolean = await can(req.session.userid || "", "create_song")

	if (authorized) {
		const song: m_song.Song = m_song.format({
			...req.body,
			userid: req.session.userid
		})
		const success: boolean = await m_song.create(song)
		
		res.json(format.data("Add song", "ACTION", success))
	}
	else {
		res.status(403).json(format.error("Forbidden", 403))
	}
}))

/**
 * update song
 */
 r_song.put("/:id", async_wrap(async (req: Request, res: Response) => {
	if (!req.session.userid) return res.status(403).json(format.error("Forbidden", 403))

	const song: m_song.Song|null = await m_song.find_by_id(req.params.id)
	if (!song) return res.status(400).json(format.error("Invalid request", 404))

	let authorized: boolean = false
	if (await can(req.session.userid, "update_all_song")) authorized = true
	else if (song.userid === req.session.userid && await can(req.session.userid, "update_own_song"))
		authorized = true

	if (authorized) {
		const song: m_song.Song = m_song.format(req.body)
		const success: boolean = await m_song.update(req.params.id, song)
		
		res.json(format.data("Update song", "ACTION", success))
	}
	else {
		res.status(403).json(format.error("Forbidden", 403))
	}
}))

/**
 * delete a song
 */
r_song.delete("/:id", async_wrap(async (req: Request, res: Response) => {
	if (!req.session.userid) return res.status(403).json(format.error("Forbidden", 403))

	const song: m_song.Song|null = await m_song.find_by_id(req.params.id)
	if (!song) return res.status(400).json(format.error("Invalid request", 404))

	let authorized: boolean = false
	if (await can(req.session.userid, "delete_all_song")) authorized = true
	else if (song.userid === req.session.userid && await can(req.session.userid, "delete_own_song"))
		authorized = true

	if (authorized) {
		const success: boolean = await m_song.del(req.params.id)
		
		res.json(format.data("Delete song", "ACTION", success))
	}
	else {
		res.status(403).json(format.error("Forbidden", 403))
	}
}))

export default r_song
