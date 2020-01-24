const express = require('express');
const router = express.Router();
const passport = require('passport');


// Renderizar el formulaio de signup
router.get('/signup', (req, res) => {
    res.render('auth/signup')
});

// Recibir los datos del formulario
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}))

router.get('/profile', (req, res) => {
    res.send('Profile')
})


module.exports = router;