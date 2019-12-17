exports.seed = function(knex) {
      
      return knex('task').insert([
        {
          description: 'food', note: 'make a sandwich'
          , completed: false
        },
        {
          description: 'notes', note: 'organize notes'
          , completed: false
        },
        {
          description: 'pillow', note: 'buy pillows'
          , completed: false
        }
      ]);
  
};
