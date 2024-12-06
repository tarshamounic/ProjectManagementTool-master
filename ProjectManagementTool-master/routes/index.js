var express = require('express');
var router = express.Router();
var auth = require("../controllers/Authentication");
var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");


router.get('/', function(req, res, next) {

  var status = req.query.status;
  //var user = req.user;

  if(!status){
    status = "";
  }
  console.log(req.user);
  
  res.render('index', { status: JSON.stringify(status), user: req.user});
});

router.get('/header', function(req, res, next) {
    
    res.render('header-template', { });
  });
  
//login api
router.post('/login', auth.login);
//register user api
router.post('/register', auth.register);
//logout api
router.get('/logout', auth.logout);

module.exports = router;
