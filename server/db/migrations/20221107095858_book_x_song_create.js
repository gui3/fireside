const { table } = require("console");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema
	.createTable("book_x_song", table => {
		table.integer("bookid").unsigned()
		table.foreign("bookid").references("bookid").inTable("books")

		table.integer("songid").unsigned()
		table.foreign("songid").references("songid").inTable("songs")

		table.integer("order").defaultTo(0)
		table.integer("transpose").defaultTo(0)
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	knex.schema
	.dropTable("book_x_song")
};
