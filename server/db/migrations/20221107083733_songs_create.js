/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema
	.createTable("songs", table => {
		table.increments("songid")
		table.string("songname").notNullable()
		table.string("author")
		table.text("content")

		table.integer("userid").unsigned()
		table.foreign("userid").references("userid").inTable("users")

		table.integer("originsongid").unsigned()
		table.foreign("originsongid").references("songid").inTable("songs")
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema
	.dropTable("songs")
};
