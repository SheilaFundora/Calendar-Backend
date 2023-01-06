const express = require('express');
const router = express.Router();  //configurando router
//importando el controlador crearUsuario
const {createUser, loginUser, revalidateToken} = require("../controllers/auth");
//el check es el middelware, q se va a encargar d validar un campo en particular
const {check} = require("express-validator");
const {validateFields} = require("../middelwares/validate-field");
const {validateToken} = require("../middelwares/validate-jwt");


/*
Direccion para estas rutas /api/auth
 */

//routes, (seguido de /api/auth)
router.post(
    '/new',
    [
        //los parametros son el campo que estamos validando, el sms, y decimos q no es vacio
        //aqui le decimos q el nombre es obligatorio
        check('name','The name is requerid').not().isEmpty(),
        //aqui le decimos q tiene q ser un emial
        check('email','The email is requerid').isEmail(),
        //la contrasenna tiene q tener minimo 6 digitis
        check('password','The password have to have 6 caracteres ').isLength({min:6}),
        validateFields
    ],
    createUser);

router.post(
    '/',
    [
        check('email','The email is requerid').isEmail(),
        check('password','The password have to have 6 caracteres ').isLength({min:6}),
        validateFields
    ],
    loginUser);

router.get( '/renew', validateToken, revalidateToken);

//exportar el router
//asi se exporta en node

module.exports = router; //exportand el router
