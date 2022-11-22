import db from "../db"
import log from "../log"

import * as m_song from "./m_song"

export interface Book {
	bookid?: number,
	bookname: string,
	userid?: number
}

export function format (input: any): Book {
	return {
		bookid: input.bookid,
		bookname: input.bookname,
		userid: input.userid
	}
}

export interface Book_x_Song {
	bookid?: number,
	songid?: number,
	transpose?: number,
	order?: number
}

export function format_x (input: any): Book_x_Song {
	return {
		bookid: input.bookid,
		songid: input.songid,
		transpose: input.transpose,
		order: input.order
	}
}

export async function find_by_id (bookid: number|string): Promise<Book|null> {
	const result: Array<Book> = await db("books")
	.where({bookid})

	if (result.length === 1) return result[0]
	else if (result.length === 0) return null
	else {
		log.info("multiple books with bookid " + bookid)
		return null
	}
}

export async function list (userid: string|number|undefined): Promise<Array<Book>> {
	if (userid) {
		return await db("books")
		.where({userid})
	}
	else {
		return await db("books")
	}
}

export async function create (book: Book): Promise<boolean> {
	try {
		const result: Array<any> = await db("books")
		.insert([book], ["bookid", "bookname"])

		return result.length === 1
	}
	catch (err) {
		log.error(err)
		return false
	}

}

export async function update (bookid: number|string, book: Book): Promise<boolean> {
	try {
		const result: any = await db("books")
		.where({bookid})
		.update(book)

		return result > 0
	}
	catch (err) {
		log.error(err)
		return false
	}
}

export async function del (bookid: number|string): Promise<boolean> {
	try {
		const result: number = await db("books")
		.where({bookid})
		.del()

		return result > 0
	}
	catch (err) {
		log.error(err)
		return false
	}
}

export async function add (bookid: number|string, songid: number|string, transpose: number = 0, order: number = 0) {
	const song: m_song.Song|null = await m_song.find_by_id(songid)
	const book: Book|null = await find_by_id(bookid)
	if (song === null || book === null) return false

	const joint: Book_x_Song = format_x({bookid, songid, transpose, order})
	const result: Array<any> = await db("book_x_song")
	.insert([joint])

	return result.length === 1
}

export async function remove (bookid: number, songid: string): Promise<boolean> {
	try {
		const result: number = await db("book_x_song")
		.where({songid, bookid})
		.del()

		return result > 0
	}
	catch (err) {
		log.error(err)
		return false
	}
}

export async function book_songs (bookid: number|string): Promise<Array<m_song.Song>> {
	return await db("songs")
	.whereIn("songid", function () {
		this.select("songid")
		.from("book_x_song")
		.where({bookid})
	})
}
