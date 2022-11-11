import {Knex} from "knex"
import connect from "./connect"

const db: Knex = connect()

export default db
