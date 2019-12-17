const express = require('express');

const Project = require('./project-model.js');

const router = express.Router();

router.get('/project', (req, res) => {
  Project.findProject()
  .then(Project => {
      const mProject= Project.map((p)=>p.completed===0?{...p,completed:false}:{...p,completed:true})
    res.json(mProject);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

router.get('/resource', (req, res) => {
    Project.findResource()
    .then(r => {
      res.json(r);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get resources' });
    });
  });

router.get('/task', (req, res) => {
    Project.findTask()
    .then(t => {
        const mTask= t.map((p)=>p.completed===0?{...p,completed:false}:{...p,completed:true})
        res.json(mTask);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get tasks' });
    });
});  

router.post('/project', (req, res) => {
  const pData = req.body;

  Project.addProject(pData)
  .then(project => {
    res.status(201).json(project);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new project' });
  });
});

router.post('/resource', (req, res) => {
    const rData = req.body;
  
    Project.addResource(rData)
    .then(r => {
      res.status(201).json(r);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new resource' });
    });
  });

router.post('/task', (req, res) => {
const tData = req.body;

    Project.addTask(tData)
    .then(t => {
        res.status(201).json(t);
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to create new task' });
    });
});  

module.exports = router;