const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../DB.js')

const sesionIniciada= (req, res, next)=>{
    if(req.session.user){
        next();
    }else{
        res.redirect('/login');
    }
};

router.get('/login',(req, res)=>{
    res.render('index.ejs');
});

router.get('/panel', sesionIniciada, async (req, res) => {
    try{
        const consultaLista = 'SELECT * FROM usuarios';
        const [rows] =await db.query(consultaLista);
        res.render('panel.ejs',{users:rows}); 
    }catch (err){
        console.error('Error al obtener los datos',err);
        res.render('index.ejs',{message: 'Error al cargar los datos'});
    }
});

router.post('/log', async (req, res)=>{
    try{
        const { email, contraseña } = req.body;
        const consultaAdmin = 'SELECT * FROM usuarios WHERE email = ? AND contraseña = ?';
        const [rows] = await db.query(consultaAdmin,[email, contraseña]);

        if(rows.length === 0){
            return res.render('index.ejs', {message: 'Usuario no encontrado'});
        }

        const usuario = rows[0];

        req.session.user = usuario;

        if(usuario.permisos=== 1){
            res.redirect('/panel')
        }else{
            res.render('index.ejs',{message: 'Error el usuario no es admin'});
        }
    }catch (err){
            console.error('Error al obtener el usuario', err);
            res.render('index.ejs', { 
            message: 'Error interno del servidor' 
        });
    }
    
});

router.post('/editar/:id', sesionIniciada, async (req, res)=>{
    const {id} = req.params;
    const {nombre, email, contraseña} = req.body;
    const permisos = req.body.permisos === 'on' ? 1 : 0;
    const consultaEditar = 'UPDATE usuarios SET nombre = ?, email = ?, permisos = ? WHERE id = ?'
    const consultaContraseña = 'UPDATE usuarios SET contraseña = ? WHERE id = ?'

    try{
        await db.query(consultaEditar, [nombre, email, permisos, id]);

        if(contraseña && contraseña.length > 0){
            await db.query(consultaContraseña,[contraseña,id]);
        }

        res.redirect('/panel');

    }catch (err){
        console.error('Error al editar',err);
        res.render('index.ejs',{message:'Error al editar el usuario'})
    }

});

router.post('/eliminar/:id', sesionIniciada, async(req,res)=>{
    const id = req.params.id;
    const consultaEliminar = 'DELETE FROM usuarios WHERE id = ?';
    try{
        await db.query(consultaEliminar,[id]);
        res.json({success:true,message:'Usuario eliminado'})
    }catch (err){
        console.error('Error al eliminar',err);
        res.status(500).json({success:false,message:'Error en el servidor'});

    }
});

router.post('/add', sesionIniciada, async(req, res)=>{
    try {
        const {nombre, email, contraseña} = req.body;
        const permisos = req.body.permisos === 'on' ? 1 : 0;
        const consultaAñadir = 'INSERT INTO usuarios (nombre, email, contraseña, permisos) VALUES (?, ? , ? ,?)';

        await db.query(consultaAñadir,[nombre, email, contraseña, permisos]);
        
        console.log('Usuario añadido');
        res.redirect('/panel');

    } catch (err) {
        console.error('Error al añadir',err);
        res.render('index.ejs', {message: 'Error al añadir el usuario'});
    }
});

router.get('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.error('Error al cerrar la sesion', err);
            return res.redirect('/panel');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

module.exports = router;