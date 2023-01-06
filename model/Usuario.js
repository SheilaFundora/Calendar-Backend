//modelo para los usuarios
const {model, Schema} = require("mongoose");

//EL Schema es como la info q vamos a grabar en la base de datos, esto es una objeto con la conf q necesitamos
//son como las campos que va a tener la tabla
const UsuarioSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    }
})

//Aqui le decimos el nombre de la tabla, y el Schema cn la conf q queremos q tenga dicha tabla y lo exportamos
module.exports = model('Usuario', UsuarioSchema);