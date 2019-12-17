exports.up = function(knex) {
    return knex.schema
        .createTable("project", tbl => {
            tbl.increments();

            tbl.string("project_name", 255)
                .notNullable()
                .unique();
            
            tbl.string("description", 800);  

            tbl.boolean("completed")
                .defaultTo(false);

            // 🔑 Foreign Key 🔑
            tbl.integer("task_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("task")
                .onDelete("RESTRICT") // CASCADE, RESTRICT, DO NOTHING, SET NULL
                .onUpdate("CASCADE");
                
            // 🔑 Foreign Key 🔑
            tbl.integer("resource_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("resource")
                .onDelete("RESTRICT") // CASCADE, RESTRICT, DO NOTHING, SET NULL
                .onUpdate("CASCADE");    
    

        })

        .createTable("task", tbl => {
            tbl.increments().unique();

            tbl.string("description", 800).notNullable();

            tbl.string("note", 800);

            tbl.boolean("completed")
                .defaultTo(false);
        })

        .createTable("resource", tbl => {
            tbl.increments();

            tbl.string("resource_name", 255).notNullable();

            tbl.string("description", 800);
        });
};

exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('project')
      .dropTableIfExists('task')
      .dropTableIfExists('resource');
  };