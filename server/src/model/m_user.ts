const createPassword = require("../../auth/createPassword")

import db from "../db"
import log from "../log"

export interface User {
	userid?: number,
	username: string,
	password?: string,
	email?: string,
	iterations?: number,
	salt?: string,
	permissions?: Array<any>
}

export function format (input: any): User {
	return {
		userid: input.userid,
		username: input.username,
		password: input.password,
		email: input.email,
		iterations: input.iterations,
		salt: input.salt
	}
}

export async function find_by_id (userid: number|string): Promise<User|null> {
	const found: Array<User> = await db("users")
	.where({userid})

	if (found.length === 1) return found[0]
	else if (found.length === 0) return null
	else {
		log.info("multiple users with userid " + userid)
		return null
	}
}

export async function find_by_email (email: string): Promise<User|null> {
	const found: Array<User> = await db("users")
	.where({email})

	if (found.length === 1) return found[0]
	else if (found.length === 0) return null
	else {
		log.info("multiple users with email " + email)
		return null
	}
}

export async function find_by_name (username: string): Promise<User|null> {
	const found: Array<User> = await db("users")
	.where({username})

	if (found.length === 1) return found[0]
	else if (found.length === 0) return null
	else {
		log.info("multiple users with username " + username)
		return null
	}
}

export async function list (search: string = ""): Promise<Array<User>> {
	const found: Array<User> = await db("users")
	.whereLike("username", `%${search}%`)
	.orWhereLike("email", `%${search}%`)

	return found.map((user: User) => { // you don't need a list of password hashes
		return {
			username: user.username,
			userid: user.userid
		}
	})
}

export async function create (user: User): Promise<number|false> {
	try {
		if (!user.password) return false
		const {password, iterations, salt} = createPassword(user.password)
		user.password = password
		user.iterations = iterations
		user.salt = salt

		const result = await db("users")
		.insert([user], ["userid", "username"])

		if (result.length === 0) return false

		return result[0].userid
	}
	catch (err) {
		log.error(err)
		return false
	}
}

export async function update (userid: number|string, new_user: User): Promise<boolean> {
	try {
		const result = await db("users")
		.where({userid})
		.update(new_user)

		return result > 0
	}
	catch (err) {
		log.error(err)
		return false
	}
}

export async function del (userid: number|string): Promise<boolean> {
	const result: number = await db("users")
	.where({userid})
	.del()

	return result > 0
}


