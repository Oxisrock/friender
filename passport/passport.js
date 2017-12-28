const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

passport.serializeUser((user, done) => {
	console.log('serialize')
	done(null, user._id)
})

passport.deserializeUser((id, done) =>{
	User.findById(id, (err, user) => {
		console.log('deserialize')
		done(err, user)
	})
})

passport.use(new LocalStrategy (
	{usernameField: 'email'},
	(email, password, done)=> {
		User.findOne({email}, (err, user) => {
			if (!user) {
				return done(null, false, {message: `El username ${user} no esta registrado`})
			} else {
				console.log(user)
				user.comparePassword(password, (err, sonIguales) => {
					if (sonIguales) {
						return done(null, user)
					} else {
						return done(null, false, {message: 'la contraseña no es valida'})
					}
				})
			}
		})}
	
))

exports.estaAutenticado = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next()
	}
	res.status(401).send('tienes que hacer login para acceder a este recurso')
}