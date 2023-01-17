const moment = require("moment");


const isDate = (value) => {

    if(!value){ //si esta vacio
        return false;
    }

    const date = moment(value);
    //validamos con la libreria d fechas moment si es una fecha valida
    return date.isValid();

}

module.exports = {
    isDate
}