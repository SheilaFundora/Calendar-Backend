const jwt = require('jsonwebtoken');
const {response} = require('express');
const Process = require("process");

const validateToken= (req, res = response, next) => {
    //resiviendo el jwt, como x-token headers
    // const token = req.body.token;
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            sms: 'No hay token'
        })
    }

    try{

        //extrayendo el payload del token mandado, es una funcion q rsibe el nombre y la palabra secreta para
        // decifrarlo

        const payload = jwt.verify(
            token,
            Process.env.SECRET_JWT
        )

    }catch(error){
        return res.status(401).json({
            ok: false,
            sms: 'Token no valido'
        })
    }

    next();

}

module.exports = {
    validateToken
}