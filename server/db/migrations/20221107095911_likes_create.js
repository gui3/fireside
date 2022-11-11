/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema
	.createTable("likes", table => {
		table.integer("userid").unsigned()
		table.foreign("userid").references("userid").inTable("users")

		table.integer("songid").unsigned()
		table.foreign("songid").references("songid").inTable("songs")
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema
	.dropTable("likes")
};
