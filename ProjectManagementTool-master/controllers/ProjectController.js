var mongoose = require("mongoose");
var Project = require("../models/Project");
var Users = require("../models/User");

var projectController = {};


// Insert a Project into Database
projectController.insertProject = async (request, response) => {
    var membersList = request.body.member.split(",");
    let validmemberList = new Set();

    for (var i = 0; i < membersList.length; i++) {
        var user = await Users.findOne({ username: membersList[i] });
        if (user != null) {
            validmemberList.add(membersList[i]);
        }
    }

    validmemberList.has(request.user.username) ? true : validmemberList.add(request.user.username);

    var projectObj = new Project({
        project_id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        description: request.body.description,
        lead: request.user.username,
        members: Array.from(validmemberList),
        start_date: request.body.startDate,
        end_date: request.body.endDate
    });
    projectObj.save(function (err, resp) {
        if (err) {
            response.redirect('/');
        }
        else {

            var conditions;
            var update = { $push: { project_id: projectObj.project_id } };
            //insert the projectid into all the group members
            validmemberList.forEach(element => {
                conditions = { username: element };
                Users.findOneAndUpdate(conditions, update, function (err, resp) {
                    if (err) return console.error(err);


                });
            });

            response.redirect('/profile');

        }

    }
    );
};
//list all the projects for a user
projectController.getprojects = async (req, res) => {

    //var user = await Users.findOne({username:req.user.username}); 
    if (req.user != null) {
        var projectlist = req.user.project_id;
        var newProjectList = [];
        for (var i = 0; i < projectlist.length; i++) {
            newProjectList.push(new mongoose.Types.ObjectId(projectlist[i]));
        }
        var condition = { $in: newProjectList };
        await Project.find({ 'project_id': condition }, function (err, docs) {
            if (err) {
                res.render('index', { title: 'Index Page' });
            }
            res.render('profile', { title: 'Profile Page', user: req.user, projects: docs });

        })
    }


};
//update the user
projectController.updateUser = async (request, response) => {

    var update = { $set: { name: request.body.name,description:request.body.description,university:request.body.university} };
   var  conditions = { username: request.user.username };
    Users.findOneAndUpdate(conditions, update, function (err, resp) {
        if (err) return console.error(err);
    
    });
    response.redirect('/profile');
};



module.exports = projectController;