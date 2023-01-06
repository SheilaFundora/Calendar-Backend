
const Usuario = require('../model/Usuario');
const bcrypt = require('bcryptjs');
const {generateJWT} = require("../helpers/jwt");

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    console.log(req.body)

    //instancea del modelo usuario, le manamos directo el body
    try{
        //validar si el email existe
        // let usuario = await Usuario.findOne(email);
        //
        // if (usuario){
        //     return res.status(400).json({
        //         ok: false,
        //         sms: 'El email ya esta existe'
        //     })
        // }

        const usuario = new Usuario( req.body);

        //encriptar contrasenna
        const salt = bcrypt.genSaltSync();
        //aqui encriptamos la contrasenna llamando a la funcion hashSync q recibe la contrasenna q
        // queremos encriptar y el salt q no es mas q los saltos q queremos q tenga, por defecto viene en 10 mientras
        // mas grande mas segura pero mas leno
        // usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();

        // const token = await generateJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            email,
            password
        })

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            sms: 'Por favor hable con el administrador'
        })
    }

}
const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try{
        const usuario = await Usuario.findOne(email);

        if (!usuario){
            return res.status(400).json({
                ok: false,
                sms: 'El usuario no existe con ese email',
            })
        }

        //Verificar si la contrasenna q hay en base d datos es igual a la enviada x el usuario
        const validPassw = bcrypt.compareSync(password, usuario.password);

        if ( !validPassw ){
            res.status(400).json({
                ok: false,
                sms: 'Paswword incorrecta',

            })
        }

        const token = await generateJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        })

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            sms: 'Por favor hable con el administrador'
        })
    }
}
const revalidateToken = async (req, res) => {
    const {uid,name} = req;

    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    createUser, loginUser, revalidateToken
}
