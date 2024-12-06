var express = require('express');
var router = express.Router();
var taskcontroller = require("../controllers/TaskController");

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log(req.user);
//   res.render('sprint', { title: 'Sprint Page', user: req.user });
// });
//list tasks for a sprint api
router.get('/:id', async (req, res, next) => {

  if(!req.user){
    res.redirect('/');
  }
  
  //list tasks
  console.log(req.params.id);
  await taskcontroller.listTasks(req, res);
});
//get task stats api
router.get('/:id/TaskStats', async (req, res, next) => {
  await taskcontroller.getTaskStats(req, res);
});
// add task api
router.post('/:id/AddTask', taskcontroller.addTask);
//update sprint api
router.post('/:id/UpdateSprint', taskcontroller.updateSprint);
//add sprint comment api
router.post('/:id/AddSprintComment', taskcontroller.addSprintComment);

module.exports = router;
