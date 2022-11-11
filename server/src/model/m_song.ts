import db from "../db"
import log from "../log"

export interface Song {
	songid?: number,
	songname: string,
	author?: string,
	content: string,
	userid?: number,
	originsongid?: number
}

export function format (input: any): Song {
	return {
		songid: input.songid,
		songname: input.songname,
		author: input.author,
		content: input.content,
		userid: input.userid,
		originsongid: input.originsongid
	}
}

export async function find_by_id (songid: number|string): Promise<Song|null> {
	const result: Array<Song> = await db("songs")
	.where({songid})

	if (result.length === 1) return result[0]
	else if (result.length === 0) return null
	else {
		log.info("multiple songs with songid " + songid)
		return null
	}
}

export async function list (filter: string = ""): Promise<Array<Song>> {
	return await db("songs")
	.whereLike("content", "%" + filter.replace(/\s/g, "%") + "%")
}

export async function create (song: Song): Promise<boolean> {
	try {
		const result: Array<any> = await db("songs")
		.insert([song], ["songid", "songname"])

		return result.length === 1
	}
	catch (err) {
		log.error(err)
		return false
	}

}

export async function update (songid: number|string, song: Song): Promise<boolean> {
	try {
		const result: any = await db("songs")
		.where({songid})
		.update(song)

		return result > 0
	}
	catch (err) {
		log.error(err)
		return false
	}
}

export async function del (songid: number|string): Promise<boolean> {
	try {
		const result: number = await db("songs")
		.where({songid})
		.del()

		return result > 0
	}
	catch (err) {
		log.error(err)
		return false
	}
}