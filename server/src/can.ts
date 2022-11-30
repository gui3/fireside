import * as m_role from "./model/m_role"

export default async function can (userid: number|string, rolename: string): Promise<boolean> {
	const roles: Array<m_role.Role> = await m_role.user_roles(userid)
	const rolenames: Array<string> = roles.map((role: any) => role.rolename)

	return rolenames.includes(rolename)
}