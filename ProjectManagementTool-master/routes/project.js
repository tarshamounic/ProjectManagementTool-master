var express = require('express');
var router = express.Router();
var sprintcontroller = require("../controllers/SprintController");
//var Project = require("../models/Project");
//var User = require("../models/User");

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('project', { title: 'Project page', user: req.user });

});*/
// list sprints api
router.get('/:id', async (req, res, next) => {
  
  if(!req.user){
    res.redirect('/');
  }

  //list sprints
  console.log(req.params.id);
  await sprintcontroller.listSprints(req, res);
});

// add member to a project api
router.post('/:id/AddMember', sprintcontroller.addMember);
//add a sprint to a project api
router.post('/:id/AddSprint', sprintcontroller.addSprint);
//update a project api
router.post('/:id/UpdateProject', sprintcontroller.updateProject);
//add a project comment api
router.post('/:id/AddProjectComment', sprintcontroller.addProjectComment);


module.exports = router;