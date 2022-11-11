const song_samples = require("../../../global/samples/songs.json")

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('songs').del()

  await knex('songs').insert(song_samples)
};
