const createPassword = require("../../auth/createPassword")

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {

	// Deletes ALL existing entries
	await knex('songs').del()
	await knex('role_x_user').del()
	await knex("users").del()
	await knex('roles').del()

	// ROLES

	const roles = await knex('roles').insert([
		{ rolename: 'admin' },
		{ rolename: 'create_song' },
		{ rolename: 'update_all_song' },
		{ rolename: 'update_own_song' },
		{ rolename: 'delete_all_song' },
		{ rolename: 'delete_own_song' }
	], ["roleid"]);

	// USERS

	const users = await knex('users').insert([
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
	], ["userid"]);

	// ROLES_x_USERS

	const adminId = users[0].userid

	await knex('role_x_user').insert([
		{ userid: adminId, roleid: roles[0].roleid },
		{ userid: adminId, roleid: roles[1].roleid },
		{ userid: adminId, roleid: roles[2].roleid },
		{ userid: adminId, roleid: roles[3].roleid },
		{ userid: adminId, roleid: roles[4].roleid },
		{ userid: adminId, roleid: roles[5].roleid }
	]);

	// SONGS


	await knex('songs').insert(song_samples.map(song => {
		song.userid =  adminId // seed songs belong to admin
		return song
	}))
};
