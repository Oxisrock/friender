const Ofert = require('../models/ofert');
module.exports = function(req, res , next) {
    // Ofert.findById(req.params.id, function(err, ofert) {
    //   if (ofert != null) {
    //     console.log('encontre una oferta' + ofert.title);
    //     res.locals.ofert = ofert
    //     next()
    //   }else {
    //     res.redirect('/')
    //   }
    // })
    Ofert.findById(req.params.ofertsId, (err, ofert) => {
      if (ofert != null) {
        console.log('encontre una oferta ' + ofert.title);
        res.locals.ofert = ofert
        next()
      }else {
        res.redirect('/')
      }
    })
}
