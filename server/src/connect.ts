const knexfile: any = require("../knexfile")
import log from "./log"

import knex, {Knex} from "knex"

export default function connect(): Knex {
	const config: any = process.env.NODE_ENV === "production"
		? knexfile.production
		: knexfile.development

	log.info("connection to " + config.client)

	return knex(config)
}
