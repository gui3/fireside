import express, { Router, Request, Response, NextFunction } from "express"
import session from "express-session"
import crypto from "crypto"

import "./types"
import log from "./log"
import format, { ApiResponse } from "./format"
import r_song from "./routes/r_song"
import r_book from "./routes/r_book"
import r_like from "./routes/r_like"
import r_auth from "./routes/r_auth"
import r_admin from "./routes/r_admin"

import r_doc from "./routes/r_doc"
import r_test from "./routes/r_test"

const api: Router = Router()

api.use(session({
	secret: crypto.randomBytes(32).toString('base64'),
	cookie: {
		maxAge: 3600000, //1h
		httpOnly: true,
		sameSite: "strict"
	},
	resave: false,
	saveUninitialized: false
}))
api.use(express.json())
api.use(express.urlencoded({ extended: true }))

// api
api.use("/song", r_song)
api.use("/book", r_book)
api.use("/like", r_like)
api.use("/", r_auth)
api.use("/admin", r_admin)
api.use("/", r_doc)

api.use("/test", r_test)


// errors
api.all("*", (req: Request, res: Response) => {
	res.status(404).json(format.error("This route doesn't exist", 404))
})

api.use((err: any, req:Request, res:Response, next:NextFunction) => {
	log.error(err)
	res.status(500).json(format.error("Internal server error", 500))
})

export default api
