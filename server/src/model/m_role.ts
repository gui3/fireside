import db from "../db";
import log from "../log";
import * as m_user from "./m_user"

export interface Role {
	roleid?: number,
	rolename: string
}

export function format (input: any): Role {
	return {
		roleid: input.roleid,
		rolename: input.rolename
	}
}

export interface Role_x_User {
	roleid?: number,
	userid?: number
}

export async function find_by_name (rolename: string): Promise<Role|null> {
	const result: Array<Role> = await db("roles")
	.where({rolename})

	if (result.length === 1) return result[0]
	else if (result.length === 0) return null
	else {
		log.info("multiple roles with name " + rolename)
		return null
	}
}

export async function list (filter: string = ""): Promise<Array<Role>> {
	return await db("roles")
	.whereLike("rolename", `%${filter}%`)
}

export async function create (rolename: string): Promise<boolean> {
	try {
		const role: Role = format({rolename})

		const result: Array<any> = await db("roles")
		.insert([role], ["roleid", "rolename"])

		return result.length > 0
	}
	catch (err) {
		log.error(err)
		return false
	}
}

export async function del (rolename: string): Promise<boolean> {
	try {
		const result: number = await db("roles")
		.where({rolename})
		.del()

		return result > 0
	}
	catch (err) {
		log.error(err)
		return false
	}
}

export async function grant (userid: number, rolename: string): Promise<boolean> {
	const user: m_user.User|null = await m_user.find_by_id(userid)
	const role: Role|null = await find_by_name(rolename)
	if (user === null || role === null) return false

	const joint: Role_x_User = {userid: user.userid, roleid: role.roleid}
	const result: Array<any> = await db("role_x_user")
	.insert([joint])

	return result.length === 1
}

export async function revoke (userid: number, rolename: string): Promise<boolean> {
	try {
		const role: Role|null = await find_by_name(rolename)
		if (role === null) return false

		const result: number = await db("role_x_user")
		.where({userid, roleid: role.roleid})
		.del()

		return result > 0
	}
	catch (err) {
		log.error(err)
		return false
	}
}

export async function user_roles (userid: number|string): Promise<Array<Role>> {
	return await db("roles")
	.whereIn("roleid", function () {
		this.select("roleid")
		.from("role_x_user")
		.where({userid})
	})
}
