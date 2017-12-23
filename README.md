# Descripción sobre **Friender:**

  > Está pesando como una plataforma web que consiste en brindar opciones de empleo a sus usuarios, de forma dinámica, directa y seria. el proyecto consiste en varias etapas de desarrollo. Una Bolsa de Empleo en Real Time:  implementada inicialmente para brindar soporte tanto a las personas como a las empresas sobre anuncios laborales tanto requeridos como como en búsqueda por los usuaria o personas.
 
### Inicializar Api-rest:

 > Modo desarrollo: `npm start`
______
### Colecciones:
> User
> Company
> Oferts
> Services
______

### Rutas
	+ Rutas User:

		- Acceder a todos los usuarios
			Metodo GET `/host:port/users`
		- Crear Usuario
			Metodo POST `/host:port/users` 
		- Acceder a Usuario
			Metodo GET `/host:port/user/:userId`
		- Actualizar información de Usuario
			Metodo PUT `/host:port/user/:userId`
		- Eliminar Usuario
			Metodo DELETE `/host:port/user/:userId`

	+ Rutas Company:

		- Acceder a todos las compañias registradas
			Metodo GET `/host:port/companys`
		- Crear Compañia
			Metodo POST `/host:port/companys` 
		- Acceder a Compañia
			Metodo GET `/host:port/company/:companyId`
		- Actualizar información de Compañia
			Metodo PUT `/host:port/company/:companyId`
		- Eliminar compañia
			Metodo DELETE `/host:port/company/:companyId`

	+ Rutas Service:

		- Acceder a todos los servicios registrados
			Metodo GET `/host:port/services`
		- Crear Servicio
			Metodo POST `/host:port/services` 
		- Acceder a los Services
			Metodo GET `/host:port/service/:serviceId`
		- Actualizar información de los servicios
			Metodo PUT `/host:port/service/:serviceId`
		- Eliminar servicio
			Metodo DELETE `/host:port/service/:serviceId`

	+ Rutas Oferts:

		- Acceder a todos las ofertas registradas
			Metodo GET `/host:port/oferts`
		- Crear Ofertas
			Metodo POST `/host:port/oferts` 
		- Acceder a las Ofertas
			Metodo GET `/host:port/ofert/:ofertId`
		- Actualizar información de las ofertas
			Metodo PUT `/host:port/ofert/:ofertId`
		- Eliminar ofertas
			Metodo DELETE `/host:port/ofert/:ofertId`


### Modelos

	+ User
		name: String,
		last_name: String,
		idcc: {type: Number, unique: true, required: 'CC is obligatory'},
		place_birth: String,
		email: { type: 'String', unique: true, lowercase: true, required: 'Email is obligatory' },
		tel: {type: Number, unique: true, required: 'Number Celphone is obligatory'},
		username: {type: 'String', lowercase: true, maxlength: [50, 'Your username is extensive'], minlength: [4, 'Your username is short']},
		nickname: {type: 'String', lowercase: true, maxlength: [20, 'Your nickname is extensive'], minlength: [4, 'Your nickname is short']},
		password: {type: 'String', select: false, minlength: [7, 'Password must be greater than 7 characters']},
		birthdate: { type: Date, required: 'birthdate is obligatory' },
		sex: { type: String, enum: ['male', 'female'], required: 'Sexo es obligatorio'},
		place_residence: String,
		profile_img: {type: String, default: null},
		banner: {type: String, default: null},
		tel_home: Number,
		permision_level: {type: Number, default: 1},
		singUpDate: {type: Date, default: Date.now()},
		lastLogin: Date

	+ Company
		name: String,
		nit: {type: String, unique: true},
		place_fundation: String,
		email: { type: 'String', unique: true, lowercase: true, required: 'Email is obligatory' },
		tel: {type: Number, unique: true, required: 'Number Celphone is obligatory'},
		username: {type: 'String', maxlength: [50, 'Your username is extensive'], minlength: [3, 'Your username is short']},
		nickname: {type: 'String', maxlength: [20, 'Your username is extensive'], minlength: [3, 'Your username is short']},
		password: {type: 'String', minlength: [7, 'Password must be greater than 7 characters']},
		fundation: Date,
		typeOfCompany: {type: String, enum: ['inmobiliaria', 'otros']},
		residence: String,
		class_company: {type: String, enum: ['sede principal', 'sucursal']},
		profile_img: {type: String, default: null},
		banner: {type: String, default: null},
		tel_home: Number,
		permision_level: {type: Number, default: 1},
		singUpDate: {type: Date, default: Date.now()} 

