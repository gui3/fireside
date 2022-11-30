import db from "../db"
import log from "../log"

/**
 * interface describing a song
 */
export interface Song {
	songid?: number,
	songname: string,
	author?: string,
	content: string,
	userid?: number,
	originsongid?: number
}

/**
 * formats input object into a Song
 * @param input an object
 * @returns an object implementing Song
 */
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

/**
 * finds the song corresponding to the provided ID or null if not found
 * @param songid the id of the song
 * @returns Promise resolving to found Song or null if not found
 */
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

/**
 * gets all songs, filtered by search if provided
 * @param filter a string to search in the songs content
 * @returns Promise resolving to an Array of Songs
 */
export async function list (filter: string = ""): Promise<Array<Song>> {
	return await db("songs")
	.whereLike("content", "%" + filter.replace(/\s/g, "%") + "%")
}

/**
 * creates and save one song in the database
 * @param song an object implementing Song, to be saved
 * @returns Promise resolving to true if success, else false
 */
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

/**
 * updates a song
 * @param songid the ID of the song to update
 * @param song a Song object with the updated data
 * @returns Promise resolving to true if success, false otherwise
 */
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

/**
 * deletes a song
 * @param songid the ID of the song to delete
 * @returns Promise resolving to true if success, false otherwise
 */
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