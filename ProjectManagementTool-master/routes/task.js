var express = require('express');
var router = express.Router();
var taskdetails = require("../controllers/TaskDetailsController");
var Sprints = require("../models/Sprint");
var Projects = require("../models/Project");
var Tasks = require("../models/Task");
var mongoose = require("mongoose");
var Users = require("../models/User");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('task', { title: 'Task Page' });
// });
//list the task detail
router.get('/:id', async (req, res, next) => {

  if(!req.user){
    res.redirect('/');
  }
  
  
  console.log(req.params.id);
  var task = await Tasks.findOne({ task_id: req.params.id });
  var sprint = await Sprints.findOne({ sprint_id: task.sprint_id })
  var project = await Projects.findOne({ project_id: sprint.project_id })

  if (task == null)
    res.render('index', { status: JSON.stringify(status), user: req.user });
  else
    res.render('task', { title: 'Task page', user: req.user, project: project, sprint: sprint, task: task });

});
//edit task api
router.post('/:id/EditTask', async (req, res, next) => {

  var user = await Users.findOne({ username: req.body.assignee });
  var userName = (user != null) ? req.body.assignee : null;

  Tasks.findOne({ task_id: new mongoose.Types.ObjectId(req.params.id) }, function (err, doc) {
    if (err) {
      console.log("update sprint failed");
      res.redirect('/task/' + req.params.id);
    }
    else {
      doc.name = req.body.name;
      doc.description = req.body.description;
      doc.start_date = req.body.startDate;
      doc.end_date = req.body.endDate;
      doc.status = req.body.status;
      doc.isAssigned = userName != null ? true : false,
      doc.assignee = userName;
      doc.save(function (err, resp) {
        if (err) {
          console.log("update task failed");
          res.redirect('/task/' + req.params.id);
        }
        else {
          console.log("updated sprint successfully");
        }
      }
      );

    }
    res.redirect('/task/' + req.params.id);
  });


});
//add task comment api
router.post('/:id/AddTaskComment', taskdetails.addTaskComment);


module.exports = router;
