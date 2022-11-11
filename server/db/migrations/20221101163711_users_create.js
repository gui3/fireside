function up(knex) {
	return knex.schema
	.createTable("users", table => {
		table.increments('userid')
		table.string('username')
		table.string('email').notNullable().unique()

		table.string('password').notNullable()
		table.string('salt').notNullable()
		table.integer('iterations').notNullable()
	})
}

function down(knex) {
	return knex.schema
	.dropTable("users")
}

module.exports = {
	up,
	down
}
