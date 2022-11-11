const createPassword = require("../../auth/createPassword.js")

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
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
}
