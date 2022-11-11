/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  
  await knex('roles').insert([
    {rolename: 'admin'},
    {rolename: 'create_song'},
    {rolename: 'update_all_song'},
    {rolename: 'update_own_song'},
    {rolename: 'delete_all_song'},
    {rolename: 'delete_own_song'}
  ]);
};
