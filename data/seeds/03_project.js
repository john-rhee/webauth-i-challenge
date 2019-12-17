
exports.seed = function(knex) {
  
      return knex('project').insert([
        {
          project_name: 'Eat', description: 'eat lunch', completed: false
          ,task_id: 1,resource_id: 1
        },
        {
          project_name: 'Sprint Challenge', description: 'finish sprint', completed: false
          ,task_id: 2,resource_id: 2
        },
        {
          project_name: 'Sleep', description: 'go to bed', completed: false
          ,task_id: 3,resource_id: 3
        }
      ]);
 
};
