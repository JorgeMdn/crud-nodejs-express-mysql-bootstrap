module.exports = {
    // Por cada ruta se van a procesar estos datos
    isLoggedIn(req, res, next) {
        // Si esta autenticado se sigue con el siguiente codigo
        if (req.isAuthenticated()) {
            return next();
        } else {
            //si no se redirecciona a /signin
            return res.redirect('/signin');
        }
    },

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/profile');
        }
    }
}