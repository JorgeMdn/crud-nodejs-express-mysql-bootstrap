const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// Renderizar el formulario de signup
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup')
});

// Recibir los datos del formulario
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}))

// Renderizar el formulario de signin
router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin')
});

// Renderizar el formulario de signin
router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);

});


// Perfil del usuario
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
})

// Logout
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
})


module.exports = router;