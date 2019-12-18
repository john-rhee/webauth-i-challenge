const db = require("../data/db-config.js");

module.exports = {
    findProject,
    findResource,
    findTask,
    addProject,
    addResource,
    addTask,
    findByIdP,
    findByIdT,
    findByIdR

};

function findByIdP(id) {
    return db("project")
        .where({ id })
        .first();
}

function findByIdT(id) {
    return db("task")
        .where({ id })
        .first();
}

function findByIdR(id) {
    return db("resource")
        .where({ id })
        .first();
}

function findProject() {
    return db("project");
}

function findResource() {
    return db("resource");
}

function findTask() {
    return db("task as t")
    .select("p.project_name", "p.description as project_description", "t.description as task_description","t.note","t.completed")
    .join("project as p", "p.task_id", "t.id");
}

function addProject(project) {
    return db("project")
        .insert(project, "id")
        .then(ids => {
            const [id] = ids;

            return findByIdP(id);
        });
}

function addResource(resource) {
    return db("resource")
        .insert(resource, "id")
        .then(ids => {
            const [id] = ids;

            return findByIdR(id);
        });
}

function addTask(task) {
    return db("task")
        .insert(task, "id")
        .then(ids => {
            const [id] = ids;

            return findByIdT(id);
        });
}