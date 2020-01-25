// SERVER 

// import dependencias
const express = require('express');
const morgan = require('morgan'); // Muestra errores en consola 
const exphbs = require('express-handlebars'); // plantillas
const path = require('path'); // concatena direcciones
const flash = require('connect-flash'); // Con esto almacena mensajes
const session = require('express-session'); // Con este modulo podemos usar las sessiones 
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys'); // Exportamos nuestra configuracion del servidor para usarla en las sesiones

// Initializations
const app = express();
require('./lib/passport');

// Settings
app.set('port', process.env.PORT || 4000); //Si existe un puerto en el sistema tomalo si no usa el 400
app.set('views', path.join(__dirname, 'views')); // Le decimos a node en donde esta la carpeta src
// sistema de  plantillas
app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs',
        helpers: require('./lib/handlebars')
    })) // configuracion de nuestro motor

app.set('view engine', '.hbs') // Usando nuestro motor

// Middlewares
app.use(session({
    secret: 'JorgeMedinaNodeSession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
app.use(flash()) // Enviamos mensajes
app.use(morgan('dev')); // parametro dev me muestra determinado mensaje en consola
app.use(express.urlencoded({ extended: false })) // podemos aceptar los formularios que envian los usuarios  con la propiedad extended: false le decimos que solo queremos formato en string, datros sencillos.
app.use(express.json()) // habilitamos que nuestra app acepte objetos json
app.use(passport.initialize());
app.use(passport.session());
//  Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success') // importando mensaje success a todas mis vistas
    app.locals.message = req.flash('message') // importando mensaje message a todas mis vistas
    app.locals.user = req.user;
    next(); // toma la informacion del usuario, toma lo que el servidor quiere responder y toma una funcion para seguir con el resto del codigo 
})

// Routes
app.use(require('./routes/index.js'));
app.use(require('./routes/authentications.js'));
app.use('/links', require('./routes/links.js')); // example localhost:4000/links/add or localhost:4000/links/edit



// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})