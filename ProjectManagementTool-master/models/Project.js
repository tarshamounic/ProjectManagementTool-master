var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    project_id: {           //Auto-generated
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: String,           //Project name
    description: String,
    lead: String,           //username of team lead
    members: [String],      //username of all team members
    start_date: Date,
    end_date: Date,
    sprints: Number,        //Number of sprints
    comments: [{
        userName: String,           //Name of user0
        comment_id: {                  //Auto-generated
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },
        content: String,
        timestamp: Date
    }]
},
    {
        collection: 'projects'  //collection name
    });

module.exports = mongoose.model('Projects', ProjectSchema);