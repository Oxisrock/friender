const User = require('../models/user')
module.exports = function (req, res, next) {

     User.find(req.session.user_id, function (err, user){
     if (err) {
       console.log(err)
     }
     else {
       res.locals = {user }
       next();
     }
    });
};
