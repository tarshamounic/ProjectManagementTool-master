var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");

var userController = {};


// Registering a User into Database
userController.register = function (request, response) {

    var user = request.body.username;
    var pass = request.body.password;
    var name = request.body.name;
    var desc = request.body.description;
    var univ = request.body.university;

    User.register(new User({ username: user, name: name, description: desc, university: univ }), pass, function (err, user) {

        if (err) {
            
            var string = encodeURIComponent('registration failed');
            return response.redirect('/?status=' + string); 
        }

        passport.authenticate('local')(request, response, function () {
            response.redirect('/profile');

        });

    });

};

// Login function for user
userController.login = function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        
        if (err) { return next(err) }
        
        if (!user) {

            var string = encodeURIComponent('login failed');
            return res.redirect('/?status=' + string);
        }

        // make passportjs setup the user object, serialize the user,
        req.login(user, {}, function (err) {
            if (err) { return next(err) };
            return res.redirect("/profile");
        });
    })(req,res,next);
    return;
}

//Logout function, deserialize, and remove user from cookie
userController.logout = function (req, res, next) {
    req.logout();

    var string = encodeURIComponent('logout');
    res.redirect('/?status=' + string);
};

module.exports = userController;