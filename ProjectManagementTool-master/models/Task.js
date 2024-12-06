var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    task_id: {                  //Auto-generated
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    sprint_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sprint'
    },
    name: String,               //Task name
    description: String,
    assignee: String,           //one username of whom the task is assigned to
    status: {                   //status of tasks - can hold only enums
        type: String, 
        enum: ['Completed', 'In-progress', 'To-do']
    },
    start_date: Date,
    end_date: Date,
    isAssigned: Boolean,
    task_history:[{
        dropped_by: String,     //username of user who dropped task
        timestamp: Date,
        reason: String
    }],
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
        collection: 'tasks'  //collection name
    });

module.exports = mongoose.model('Tasks', TaskSchema);