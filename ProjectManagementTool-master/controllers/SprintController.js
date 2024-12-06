var mongoose = require("mongoose");
var Project = require("../models/Project");
var Users = require("../models/User");
var Sprints = require("../models/Sprint");
var JSAlert = require("js-alert");

var sprintController = {};


// Insert a Member to a project
sprintController.addMember = async (req, res) => {
    var user = await Users.findOne({ username: req.body.member });
    //checking to see if the new member is already part of the selected project
    var inValidMember = user != null ? user.project_id.some(ids => ids.equals(new mongoose.Types.ObjectId(req.params.id))) : true;
    if (!inValidMember) {

        var update = { $push: { project_id: new mongoose.Types.ObjectId(req.params.id) } };
        var conditions = { username: req.body.member };
        //updating user with the new projectid
        Users.findOneAndUpdate(conditions, update, function (err, resp) {
            if (err) return console.error(err);
            else {
                //updating project with the new member
                update = { $push: { members: req.body.member } };
                conditions = { project_id: new mongoose.Types.ObjectId(req.params.id) };
                Project.findOneAndUpdate(conditions, update, function (err, resp) {
                    if (err) return console.error(err);
                    else {
                        res.redirect('/project/' + req.params.id);
                    }
                });
            }
        });


    }
    else {
        res.redirect('/project/' + req.params.id);
        //figure out how to send error and get redericted back to this page
        // res.send('<script>alert("This Member already exists for the Project")</script>')
        // res.redirect('/project/'+req.params.id);
        console.error("This Member already exists for the Project");
    }
};
// Insert a Sprint to a project
sprintController.addSprint = async (req, res) => {

    var sprint = new Sprints({
        sprint_id: new mongoose.Types.ObjectId(),
        project_id: new mongoose.Types.ObjectId(req.params.id),
        name: req.body.name,
        status: 'To-do',
        description: req.body.description,
        start_date: req.body.startDate,
        end_date: req.body.endDate
    });
    sprint.save(function (err, resp) {
        if (err) {
            console.log("Sprint insertion failed");
            res.redirect('/project/' + req.params.id);
        }
        else {
            console.log("Inserted the sprint successfully");
        }

    });
    res.redirect('/project/' + req.params.id);

};

// List Sprints of a project
sprintController.listSprints = async (req, res) => {
    var project = await Project.findOne({ project_id: req.params.id });
    var lead = await Users.findOne({ username: project.lead });
    //return all the sprints for the selected project
    await Sprints.find({ project_id: req.params.id }, function (err, sprints) {
        if (err) {
            res.render('project', { title: 'Project page', user: req.user, project: project, lead: lead, sprints: null });
        }
        else {
            res.render('project', { title: 'Project page', user: req.user, project: project, lead: lead, sprints: sprints });
        }
    })



};

// Update a project
sprintController.updateProject = async (req, res) => {
    var membersList = req.body.member.split(",");
    let validmemberList = new Set();
    let memberListToPush = new Set();
    //checking if the user entered as a member is a valid user, and if he is not already listed as part of the project
    for (var i = 0; i < membersList.length; i++) {
        var user = await Users.findOne({ username: membersList[i] });
        var inValidMember = (user != null) ? user.project_id.some(ids => ids.equals(new mongoose.Types.ObjectId(req.params.id))) : true;
        if (user != null) {
            memberListToPush.add(membersList[i]);
        }
        if (!inValidMember) {
            validmemberList.add(membersList[i]);
        }
    }
    //validmemberList.has(request.user.username) ? true : validmemberList.add(request.user.username);

    Project.findOne({ project_id: new mongoose.Types.ObjectId(req.params.id) }, function (err, doc) {
        if (err) {
            console.log("update failed");
            res.redirect('/project/' + req.params.id);

        }
        else {
            doc.name = req.body.name;
            doc.description = req.body.description;
            //doc.lead = req.user.username;
            doc.members = Array.from(memberListToPush);
            doc.start_date = req.body.startDate;
            doc.end_date = req.body.endDate;
            doc.save(function (err, resp) {
                if (err) {
                    console.log("update failed");
                    res.redirect('/project/' + req.params.id);
                }
                else {
                    var conditions;
                    var update = { $push: { project_id: new mongoose.Types.ObjectId(req.params.id) } };
                    //insert the projectid into all the group members
                    validmemberList.forEach(element => {
                        conditions = { username: element };
                        Users.findOneAndUpdate(conditions, update, function (err, resp) {
                            if (err) return console.error(err);
                        });
                    });

                    res.redirect('/project/' + req.params.id);

                }

            }
            );

        }

    });

};


//Adding comments in project dashboard
sprintController.addProjectComment = async (req, res) => {
    var comment = {
        comment_id: new mongoose.Types.ObjectId(),
        userName: req.user.name,
        content: req.body.content,
        timestamp: Date.now()
    };
    
    var update = { $push: { comments: comment } };
    var conditions = { project_id: new mongoose.Types.ObjectId(req.params.id) };
    Project.findOneAndUpdate(conditions, update, function (err, resp) {
        if (err) return console.error(err);
        else {
            var li = '<li><div class="commenterImage"><img src="/images/blank-profile.png" /></div><div class="commentText"><p class="">'+comment.content+'</p><span class="date sub-text">'+comment.userName+'</span></div></li>'
            res.send(li);
        }
    });
    
};



module.exports = sprintController;