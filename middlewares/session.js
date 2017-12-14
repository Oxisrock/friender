const Company = require('../models/company')
module.exports = function(req, res, next) {
  if (req.session.company_id) {
    res.redirect('/companys/login')
  } else {
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
};
