exports.seed = function(knex) {
    
      return knex('resource').insert([
        {
          resource_name: 'school', description: 'Lambda'
        },
        {
          resource_name: 'store', description: 'Walmart'
        },
        {
          resource_name: 'home', description: 'nice room'
        }
      ]);
 
};