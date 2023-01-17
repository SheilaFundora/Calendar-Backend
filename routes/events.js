const express = require('express');
const router = express.Router();

const {createEvents, deleteEvents, getEvents, updateEvents} = require ('../controllers/events');
const {validateToken} = require("../middelwares/validate-jwt");
const {check} = require("express-validator");
const {validateFields} = require("../middelwares/validate-field");
const {isDate} = require("../helpers/isDate");

//routes, (seguido de /api/evetns )

//Todas las rutas tinen q estar validads x su jwt revalidateToken()

//aqui le estamos deciendo q todoo lo viene abajo va a aplicar esto, es como para no repetirlo en cada ruta lo
// ponemos asi, es super util si quiers q lo validen todas mens la primera la corro d lugar xq valida a partir
// d a q le sige

router.use(validateToken);

//get event
router.get('/', getEvents);

//create event
router.post('/',
    [
        check('title','The title is requerid').not().isEmpty(),
        //el custom es un collback para hacer validaciones personalizadas, dentro ponemos el
        // archivo donde haremos la validacion personalizada
        check('date_start','The date_star is requerid').custom(isDate),
        check('date_end','The date_end is requerid').custom(isDate),
        validateFields
    ],
    createEvents);

//delete event
router.delete('/:id', deleteEvents);

//update evento
router.put('/:id', updateEvents);

module.exports = router;

