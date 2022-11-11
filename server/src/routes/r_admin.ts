import {Router, Request, Response, NextFunction} from "express"
import async_wrap from "../async_wrap"

import can from "../can"
import format from "../format"
import * as m_role from "../model/m_role"
import * as m_user from "../model/m_user"

const r_admin: Router = Router()

r_admin.use(async_wrap(async (req: Request, res: Response, next: NextFunction) => {
	if (await can(req.session.userid || "", "admin")) next()
	else res.status(403).json(format.error("Forbidden", 403))
}))

r_admin.get("/can/:id", async_wrap(async (req: Request, res: Response) => {
	const permissions: Array<m_role.Role> = await m_role.user_roles(req.params.id)
	res.json(format.data(permissions, "ROLES"))
}))

r_admin.get("/can", async_wrap(async (req: Request, res: Response) => {
	const users: Array<m_user.User> = await m_user.list()
	for (let user of users) {
		const permissions: Array<m_role.Role> = await m_role.user_roles(user.userid || "")
		user.permissions = permissions.map(role => role.rolename)
	}
	res.json(format.data(users, "USERS"))
}))

r_admin.post("/grant", async_wrap(async (req: Request, res: Response) => {
	if (!req.body.userid || !req.body.rolename) return res.status(400).json(format.error("Invalid Request"))
	const done: boolean = await m_role.grant(req.body.userid, req.body.rolename)
	res.json(format.data("Grant permission", "DONE", done))
}))

r_admin.post("/revoke", async_wrap(async (req: Request, res: Response) => {
	if (!req.body.userid || !req.body.rolename) return res.status(400).json(format.error("Invalid Request"))
	const done: boolean = await m_role.revoke(req.body.userid, req.body.rolename)
	res.json(format.data("Revoke permission", "DONE", done))
}))

r_admin.get("/role", async_wrap(async (req: Request, res: Response) => {
	const roles: Array<m_role.Role> = await m_role.list()
	res.json(format.data(roles, "ROLES"))
}))

r_admin.post("/role", async_wrap(async (req: Request, res: Response) => {
	if (!req.body.rolename) return res.status(400).json(format.error("Invalid Request"))
	const done: boolean = await m_role.create(req.body.rolename)
	res.json(format.data("Create role", "DONE", done))
}))

r_admin.delete("/role", async_wrap(async (req: Request, res: Response) => {
	if (!req.body.rolename) return res.status(400).json(format.error("Invalid Request"))
	const done: boolean = await m_role.del(req.body.rolename)
	res.json(format.data("Delete role", "DONE", done))
}))


export default r_admin