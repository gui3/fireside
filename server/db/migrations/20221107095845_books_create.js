/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema
	.createTable("books", table => {
		table.increments("bookid")
		table.string("bookname")
		
		table.integer("userid").unsigned()
		table.foreign("userid").references("userid").inTable("users")
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema
	.dropTable("books")
};
