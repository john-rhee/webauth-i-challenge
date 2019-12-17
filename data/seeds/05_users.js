exports.seed = function(knex) {
  return knex("users").insert([
    { username: "alberto", password: "pass", role_id: 3 },
    { username: "anthony", password: "pass", role_id: 3 },
    { username: "michael", password: "pass", role_id: 3 },
  ]);
};
