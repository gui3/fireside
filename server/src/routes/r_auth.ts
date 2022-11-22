import { Router, Request, Response } from "express"

const checkPassword = require("../../auth/checkPassword")
import log from "../log"
import format from "../format"
import async_wrap from "../async_wrap"
import * as m_user from "../model/m_user"
import * as m_role from "../model/m_role"

const r_auth: Router = Router()

/**
 * login to an account
 */
r_auth.post("/login", async_wrap(async (req: Request, res: Response) => {
	const login: string = req.body.email || req.body.username || req.body.login || ""
	if (login.length === 0) return res.status(400).json(format.error("Invalid credentials", 400))

	let user: m_user.User|null = await m_user.find_by_email(login)
	if (!user) user = await m_user.find_by_name(login) // try username
	if (!user) return res.status(400).json(format.error("Invalid credentials", 400))

	const passed: boolean = checkPassword(
		req.body.password,
		String(user.password),
		user.salt,
		user.iterations
	)
	if (!passed) return res.status(400).json(format.error("Invalid credentials", 400))
	
	req.session.userid = user.userid
	req.session.date = new Date()
	return res.json(format.data("Successful login, welcome to you!", "DONE"))
}))

/**
 * add one song
 */
r_auth.all("/logout", (req: Request, res: Response) => {
	let message: string = "Successful logout"
	if (req.query.reason) message += ` (${req.query.reason})`

	req.session.destroy(err => {
		if (err) {
			log.error(err)
			res.status(500).json(format.error("Server error", 500))
		}
		else res.json(format.data(message, "MESSAGE"))
	})
})

/**
 * session info
 */
r_auth.all("/session", (req: Request, res: Response) => {
	res.json(format.data({...req.session, cookie: undefined}, "SESSION", req.session.userid !== undefined))
})

/**
 * show user info
 */
r_auth.get("/me", async_wrap(async (req: Request, res: Response) => {
	if (!req.session.userid) return res.status(403).json(format.data("You are not logged in", "MESSAGE", false))

	const user: m_user.User|null = await m_user.find_by_id(req.session.userid)
	if (!user) return res.redirect("/api/auth/logout?reason=USER_DOES_NOT_EXIST")
	else user.permissions = await m_role.user_roles(user.userid || "")

	res.json(format.data({...user, password: undefined, salt: undefined, iterations: undefined}, "USER"))
}))

/**
 * register
 */
r_auth.post("/signup", async_wrap(async (req: Request, res: Response) => {
	const new_user: m_user.User = m_user.format(req.body)
	const done: boolean = await m_user.create(new_user)

	if (done) res.redirect(307, "/api/login")
	else res.json(format.error("Could not create your account", 400))
}))

/**
 * update user
 */
r_auth.put("/me", async_wrap(async (req: Request, res: Response) => {
	if (!req.session.userid) return res.status(403).json(format.data("You are not logged in", "MESSAGE", false))

	const new_user: m_user.User = m_user.format(req.body)
	const done: boolean = await m_user.update(req.session.userid, new_user)

	res.json(format.data("Update user", "ACTION", done))
}))

/**
 * delete a user
 */
r_auth.delete("/me", async_wrap(async (req: Request, res: Response) => {
	if (!req.session.userid || !req.body.password) return res.status(403).json(format.error("Forbidden", 403))

	const user: m_user.User|null = await m_user.find_by_id(req.session.userid || "")
	if (!user) return res.redirect("/api/auth/logout?reason=USER_DOES_NOT_EXIST")

	const authorized: boolean = checkPassword(
		req.body.password,
		String(user.password),
		user.salt,
		user.iterations
	)
	if (!authorized) return res.status(403).json(format.error("Forbidden", 403))

	m_user.del(req.session.userid)
	res.redirect("/api/auth/logout?reason=USER_SUCCESSFULLY_DELETED")
}))

/**
 * list other users
 */
r_auth.get("/user", async_wrap(async (req: Request, res: Response) => {
	const users: Array<m_user.User> = await m_user.list(req.params.search || "")

	res.json(format.data(users, "USERS"))
}))

/**
 * see other user's info
 */
r_auth.get("/user/:id", async_wrap(async (req: Request, res: Response) => {
	const user: m_user.User|null = await m_user.find_by_id(req.params.id)
	if (!user) return res.status(404).json(format.error("No user found", 404))

	res.json(format.data({
		username: user.username,
		userid: user.userid
	}, "USER"))
}))

export default r_auth
