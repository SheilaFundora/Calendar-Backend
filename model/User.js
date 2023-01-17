//modelo para los usuarios
const {model, Schema} = require("mongoose");

//EL Schema es como la info q vamos a grabar en la base de datos, esto es una objeto con la conf q necesitamos
//son como las campos que va a tener la tabla
const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    }
})

//Aqui le decimos el nombre de la tabla, y el Schema cn la conf q queremos q tenga dicha tabla y lo exportamos
module.exports = model('User', UserSchema);