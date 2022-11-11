function up(knex) {
	return knex.schema
	.createTable("role_x_user", table => {
		table.integer("userid").unsigned()
		table.foreign("userid").references("userid").inTable("users")
		table.integer("roleid").unsigned()
		table.foreign("roleid").references("roleid").inTable("roles")
	})
}

function down(knex) {
	return knex.schema
	.dropTable("role_x_user")
}

module.exports = {
	up,
	down
}