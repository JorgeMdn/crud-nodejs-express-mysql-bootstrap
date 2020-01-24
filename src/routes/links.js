const express = require('express');
const router = express.Router();

const pool = require('../database'); // hace referencia a la conexion a la base de datos

router.get('/add', (req, res) => {
    res.render('links/add');
})

// add
router.post('/add', async(req, res) => {
    const { title, url, description } = req.body; //Estamos utilizando destructuring adquiriendo propiedades especificas
    const newLink = {
        title,
        url,
        description
    };
    // peticion asyncrona
    await pool.query('INSERT INTO links set ?', [newLink]);
    //console.log(newLink);
    req.flash('success', 'Link saved successfully');
    res.redirect('/links');
});


// list

router.get('/', async(req, res) => {
    const links = await pool.query('SELECT * FROM links');
    //console.log(links);
    res.render('links/list', { links }); // a estas rutas les precede en la url /links/

});

router.get('/delete/:id', async(req, res) => {

    const { id } = req.params;
    await pool.query(' DELETE FROM links WHERE id = ?', [id]);
    req.flash('success', 'Link Removed successfully')
    res.redirect('/links');
});

router.get('/edit/:id', async(req, res) => {

    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(links);

    res.render('links/edit', { link: links[0] });
});

router.post('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body; //Estamos utilizando destructuring adquiriendo propiedades especificas
    const linkEdit = {
        title,
        url,
        description
    };
    // peticion asyncrona
    await pool.query('UPDATE links set ? WHERE id = ?', [linkEdit, id]);
    //console.log(linkEdit);
    req.flash('success', 'Link Updated Successfully')
    res.redirect('/links');
});

module.exports = router;