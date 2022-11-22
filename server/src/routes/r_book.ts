import { Router, Request, Response } from "express"

import format, { ApiResponse } from "../format"
import async_wrap from "../async_wrap"
import * as m_book from "../model/m_book"
import * as m_song from "../model/m_song"
import can from "../can"

const r_book: Router = Router()

/**
 * @route GET /api/book
 * @description
 * list all books of current user
 */
r_book.get("/", async_wrap(async (req: Request, res: Response) => {
	const userid = req.session.userid
	const books: Array<m_book.Book> = await m_book.list(userid)

	res.json(format.data(books, "BOOKS"))
}))

/**
 * @route GET /api/book/:id
 * @description
 * see one book & songs IF current user is owner
 */
r_book.get("/:id", async_wrap(async (req: Request, res: Response) => {
	const book: m_book.Book|null = await m_book.find_by_id(req.params.id)

	if (!(book && book.userid === req.session.userid))
		return res.status(404).json(format.error("No book found", 404))

	const songs: Array<m_song.Song> = await m_book.book_songs(req.params.id)
	
	const data = {
		...book,
		songs
	}
	res.json(format.data(book, "BOOK_WITH_SONGS"))
}))

/**
 * @route POST /api/book
 * create one book
 */
r_book.post("/", async_wrap(async (req: Request, res: Response) => {
	const authorized: boolean = req.session.userid !== undefined //await can(req.session.userid || "", "create_song")

	if (authorized) {
		const book: m_book.Book = m_book.format({
			...req.body,
			userid: req.session.userid
		})
		const success: boolean = await m_book.create(book)
		
		res.json(format.data("Create book", "ACTION", success))
	}
	else {
		res.status(403).json(format.error("Forbidden", 403))
	}
}))

/**
 * @route PUT /api/book/:id
 * update book
 */
r_book.put("/:id", async_wrap(async (req: Request, res: Response) => {
	if (!req.session.userid) return res.status(403).json(format.error("Forbidden", 403))

	const book: m_book.Book|null = await m_book.find_by_id(req.params.id)
	if (!book) return res.status(404).json(format.error("Invalid request", 404))

	let authorized: boolean = false
	if (await can(req.session.userid, "update_all_book")) authorized = true
	else if (book.userid === req.session.userid /*&& await can(req.session.userid, "update_own_song")*/)
		authorized = true

	if (authorized) {
		const new_book: m_book.Book = m_book.format(req.body)
		const success: boolean = await m_book.update(req.params.id, book)
		
		res.json(format.data("Update book", "ACTION", success))
	}
	else {
		res.status(403).json(format.error("Forbidden", 403))
	}
}))

/**
 * @route DELETE /api/book/:id
 * delete a song
 */
r_book.delete("/:id", async_wrap(async (req: Request, res: Response) => {
	if (!req.session.userid) return res.status(403).json(format.error("Forbidden", 403))

	const book: m_book.Book|null = await m_book.find_by_id(req.params.id)
	if (!book) return res.status(404).json(format.error("Invalid request", 404))

	let authorized: boolean = false
	if (await can(req.session.userid, "delete_all_book")) authorized = true
	else if (book.userid === req.session.userid /*&& await can(req.session.userid, "delete_own_song")*/)
		authorized = true

	if (authorized) {
		const success: boolean = await m_book.del(req.params.id)
		
		res.json(format.data("Delete book", "ACTION", success))
	}
	else {
		res.status(403).json(format.error("Forbidden", 403))
	}
}))

/**
 * @route POST /api/book/song
 * @expects {songid, bookid}
 * @description adds a song to a book if book of user
 */
r_book.post("/song", async_wrap(async (req: Request, res: Response) => {
	const book: m_book.Book|null = await m_book.find_by_id(req.body.bookid)

	if (!(book && book.userid === req.session.userid))
		return res.status(400).json(format.error("Invalid request", 400))
	
	const success: boolean = await m_book.add(req.body.bookid, req.body.songid, req.body.transpose, req.body.order)

	res.json(format.data("Add song to book", "ACTION", success))
}))

/**
 * @route DELETE /api/book/song
 * @expects {songid, bookid}
 * @description remove a song from a book if book of user
 */
 r_book.delete("/song", async_wrap(async (req: Request, res: Response) => {
	const book: m_book.Book|null = await m_book.find_by_id(req.body.bookid)

	if (!(book && book.userid === req.session.userid))
		return res.status(400).json(format.error("Invalid request", 400))
	
	const success: boolean = await m_book.remove(req.body.bookid, req.body.songid)

	res.json(format.data("Remove song to book", "ACTION", success))
}))

export default r_book
