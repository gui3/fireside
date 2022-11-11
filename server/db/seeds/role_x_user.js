/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('role_x_user').del()

	await knex('role_x_user').insert([
		{ userid: 1, roleid: 1 },
		{ userid: 1, roleid: 2 },
		{ userid: 1, roleid: 3 },
		{ userid: 3, roleid: 1 },
		{ userid: 3, roleid: 2 }
	]);
};
