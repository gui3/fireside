import db from "../db"
import log from "../log"

import * as m_song from "./m_song"
import * as m_user from "./m_user"

export interface Like {
	songid?: number,
	userid?: number
}

export function format (input: any): Like {
	return {
		songid: input.songid,
		userid: input.userid
	}
}

export async function liked (userid: number|string, songid: number|string): Promise<boolean> {
	const result: Array<Like> = await db("likes")
	.where({songid, userid})

	return result.length > 0
}

/**
 * like a song
 * @param userid the user id
 * @param songid the song id to like
 * @returns Promise resolving to true if success, false otherwise
 */
export async function like (userid: number|string, songid: number|string): Promise<boolean> {
	const song: m_song.Song|null = await m_song.find_by_id(songid)
	const user: m_user.User|null = await m_user.find_by_id(userid)
	if (song === null || user === null) return false

	const joint: Like = format({userid, songid})
	const result: Array<any> = await db("likes")
	.insert([joint])

	return result.length === 1
}

/**
 * unlikes a song (deletes all existing likes)
 * @param userid the user id
 * @param songid the song id to like
 * @returns Promise resolving to true if success, false otherwise
 */
export async function unlike (userid: number|string, songid: number|string): Promise<boolean> {
	try {
		const result: number = await db("likes")
		.where({songid, userid})
		.del()

		return result > 0
	}
	catch (err) {
		log.error(err)
		return false
	}
}

export async function toggle (userid: number|string, songid: number|string): Promise<Array<boolean>> {
	let success: boolean = await unlike(userid, songid)
	if (!success) {
		success = await like(userid, songid)
		return [success, true]
	}
	else {
		return [true, false]
	}
}