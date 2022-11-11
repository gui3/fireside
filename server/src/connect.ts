const knexfile = require("../knexfile")
import log from "./log"

import knex, {Knex} from "knex"
//import knexfile from "../knexfile"

export default function connect(): Knex {
	const config = process.env.NODE_ENV === "production"
		? knexfile.production
		: knexfile.development

	log.info("connection to " + config.client)

	return knex(config)
}

//module.exports = connect
