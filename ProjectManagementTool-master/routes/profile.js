var express = require('express');
var router = express.Router();
var projectcontroller = require("../controllers/ProjectController");


/* GET home page. */
router.get('/', async (req, res) => {
  if(!req.user){
    res.redirect('/');
  }
  await projectcontroller.getprojects(req, res);
});

router.post('/InsertProject', projectcontroller.insertProject);
router.post('/UpdateUser', projectcontroller.updateUser);
module.exports = router;
