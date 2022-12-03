import createPassword from "../../auth/createPassword"

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
	// ROLES

	// Deletes ALL existing entries
	await knex('roles').del()

	await knex('roles').insert([
		{ rolename: 'admin' },
		{ rolename: 'create_song' },
		{ rolename: 'update_all_song' },
		{ rolename: 'update_own_song' },
		{ rolename: 'delete_all_song' },
		{ rolename: 'delete_own_song' }
	]);

	// USERS

	// Deletes ALL existing entries
	await knex("users").del()

	await knex('users').insert([
		{
			...createPassword("admin"),
			username: "admin",
			email: "gui.silvent@gmail.com"
		}, {
			...createPassword("guest"),
			username: "guest",
			email: "guest@yopmail.com"
		}, {
			...createPassword("member"),
			username: "member",
			email: "member@yopmail.com"
		}
	]);

	// ROLES_x_USERS

	await knex('role_x_user').del()

	await knex('role_x_user').insert([
		{ userid: 1, roleid: 1 },
		{ userid: 1, roleid: 2 },
		{ userid: 1, roleid: 3 },
		{ userid: 1, roleid: 4 },
		{ userid: 1, roleid: 5 },
		{ userid: 1, roleid: 6 }
	]);
};
