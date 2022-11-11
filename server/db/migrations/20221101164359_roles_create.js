function up(knex) {
	return knex.schema
	.createTable("roles", table => {
		table.increments("roleid")
		table.string('rolename')
	})
}

function down(knex) {
	return knex.schema
	.dropTable("roles")
}

module.exports = {
	up,
	down
}
