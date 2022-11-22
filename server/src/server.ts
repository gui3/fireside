import express, { Express, Request, Response, NextFunction } from 'express'
import {resolve} from "path"
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
app.use(express.static(resolve(__dirname,"../../public")))

// api
app.use("/api", api)

// non-api 404 => handled by client
app.use((req:Request, res:Response, next:NextFunction) => {
	console.log("> turnover " + req.url)
	next()
})
app.use((req:Request, res:Response) => {
	res.sendFile(resolve(
		__dirname,
		"../../public/index.html"
	))
})

// listen
app.listen(port, () => {
	log.info(`⚡️[server]: Server is running at https://localhost:${port}`)
})