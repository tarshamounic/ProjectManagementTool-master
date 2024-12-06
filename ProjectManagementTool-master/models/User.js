var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: String,       //Auto-generated
    password: String,       //excrypted through passport module
    name: String,
    project_id: [{           //Reference to projects from projects collection
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    description: String,
    university: String
},
    {
        collection: 'users'     //collection name
    });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
