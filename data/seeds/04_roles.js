exports.seed = function(knex) {
  // 000-cleanup.js deleted the data from all tables, we only need to insert the seed data
  return knex("roles").insert([
    { name: "admin" }, // id: 1
    { name: "TLs" }, // id: 2
    { name: "students" }, // id: 3
  ]);
};
