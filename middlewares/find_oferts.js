const Ofert = require('../models/ofert');
module.exports = function(req, res , next) {
  Ofert.findById(req.params.ofertsId)
  .populate('creator')
  .exec((err, ofert) => {
    if (ofert != null) {
      res.locals.ofert = ofert
      next()
    }else {
      res.redirect('/')
    }
  })
}
