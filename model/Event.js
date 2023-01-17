const {model, Schema} = require("mongoose");

const EventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    date_start: {
        type: Date,
        required: true
    },
    date_end: {
        type: Date,
        required: true
    },
    user: {
        //asi enlasamos las base d datos, para registar el usuario q hiso la nota
        type: Schema.Types.ObjectId, //le decimos el tipo
        ref: 'User', //le decimos d q modelo es
        required: true,
    }
})

//aqui podemos configurar ciertas cosas en los modelos d la bd
//x defecto cuando se crea una tabla se pone _id, y queremos cambiar esto x id
EventSchema.method('toJSON', function (){
    const {_id, ...object} = this.toObject();//en this.toObject tenemos todoo, sacamos el id, y el resto lo dejamos como esta
    object.id = _id
    return object;
})

module.exports = model('Event', EventSchema);