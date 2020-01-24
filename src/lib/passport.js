const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    const { fullname } = req.body;
    const newUser = {
        username,
        password,
    };
    newUser.password = await helpers.encryptPassword(password); //Encriptamos la contraseña con nuestro metodo
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    //console.log(result);
    newUser.id = result.insertId;
    return done(null, newUser); //retornamos el callback done

}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});