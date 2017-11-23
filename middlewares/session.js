const User = require('../models/user')
module.exports = function (req, res, next) {
  if (!req.session.user_id) {
    res.redirect('/login')
  }
  else {
     User.findById(req.session.user_id, function (err, user){
     if (err) {
       console.log(err)
     }
     else {[]
       res.locals = {user }
       next();
     }
    });
 }
};
