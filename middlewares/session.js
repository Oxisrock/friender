const Company = require('../models/company')
const User = require('../models/user')
module.exports = function(req, res, next) {
  if (req.session.company_id) || (req.session.user_id ){
  
    // res.redirect('/companys/login')
  } 
  if (req.session.company_id) {    
    Company.findById(req.session.company_id, function(err, company) {
      if (err) {
        console.log(err)
      } else {
        res.locals = {
          company : company
        }
        next();
      }
    });
  }
  if (req.session.user_id) {
    User.findById(req.session.user_id, function(err, user) {
      if (err) {
        console.log(err)
      } else {
        res.locals = {
          user : user
        }
        next();
      }
    });

  }

};
