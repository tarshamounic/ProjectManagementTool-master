var mongoose = require("mongoose");
var Project = require("../models/Project");
var Users = require("../models/User");
var Sprints = require("../models/Sprint");
var Tasks = require("../models/Task");
var JSAlert = require("js-alert");

var taskDetailsController = {};

//adding comments on task dashboard
taskDetailsController.addTaskComment = async (req, res) => {
    var comment = {
        comment_id: new mongoose.Types.ObjectId(),
        userName: req.user.name,
        content: req.body.content,
        timestamp: Date.now()
    };

    var update = { $push: { comments: comment } };
    var conditions = { task_id: new mongoose.Types.ObjectId(req.params.id) };
    Tasks.findOneAndUpdate(conditions, update, function (err, resp) {
        if (err) return console.error(err);
        else {
            var li = '<li><div class="commenterImage"><img src="/images/blank-profile.png" /></div><div class="commentText"><p class="">'+comment.content+'</p><span class="date sub-text">'+comment.userName+'</span></div></li>'
            res.send(li);
        }
    });
};

module.exports = taskDetailsController;