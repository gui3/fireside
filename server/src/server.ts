import express, { Express, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import api from "./api"
import log from "./log"

dotenv.config();

// parameters
const port = process.env.PORT || "8080"

// app
const app: Express = express()

app.use("*", (req:Request, res:Response, next:NextFunction): void => {
	log.info(req.method + " " + req.originalUrl + " FROM " + req.ip)
	next()
})

// static
app.use(express.static("../../public"))

app.use("/api", api)

/*
app.use("*", (req: Request, res: Response, next: NextFunction, err: any) => {
	if (err) console.error(err)
	//next()
})
*/

// listen
app.listen(port, () => {
	log.info(`⚡️[server]: Server is running at https://localhost:${port}`)
})