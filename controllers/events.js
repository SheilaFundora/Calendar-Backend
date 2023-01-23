const {response} = require('express');
const Event = require("../model/Event");
const jwt = require('jsonwebtoken');
const Process = require("process");


const getEvents =  async (req, res = response) => {

    const event = await Event.find().populate('user');
    // tabla asociada o sea los del usuario
    res.status(200).json({
        ok: false,
        sms: event
    })
}

const createEvents = async (req, res = response) => {
    try{
        const event = new Event( req.body);

        const payload = jwt.verify(
            req.body.token,
            Process.env.SECRET_JWT
        )

        event.user = payload.uid; //aqui le estamos asignando al campo user d la tabla evento l uid q tenemos en la rq

        const saveEvent = await event.save();

        res.status(201).json({
            ok: true,
            saveEvent
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            sms: 'Por favor hable con el administrador'
        })
    }
}

const deleteEvents =  async (req, res = response) => {

    const eventId = req.params.id;

    try{
        const event = await Event.findById(eventId);

        if( !event ){
            return res.status(400).json({
                ok: false,
                sms: 'El eventpo no existe por esa id'
            })
        }

        if( event.user.toString() !== req.uid ){
            return res.status(401).json({
                ok: false,
                sms: 'No tiene permisos para eliminar este evento'
            })

        }

        const eventUpdated = Event.findByIdAndDelete(eventId);//resive el id

        res.status(201).json({
            ok: true,
            sms: 'El evento se ha eliminado exitosamente'
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            sms: 'Por favor hable con el administrador'
        })
    }
}

const updateEvents =  async (req, res = response) => {

    const eventId = req.params.id; //asi m quedo con lo q sige en la url, con el id

    try{
        const event = await Event.findById(eventId);

        if( !event ){
            return res.status(400).json({
                ok: false,
                sms: 'El eventpo no existe por esa id'
            })
        }

        if( event.user.toString() !== req.uid ){ //si esto pasa es q hay una persona q quiere editar el evento sin permiso ya q no
            // la q lo crop, no su evento
            return res.status(401).json({
                ok: false,
                sms: 'No tiene permisos para actualizar este evento'
            })

        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }
        //o sea aqui le decimos q busque el elemento por el id y lo actualice, le pasamos el id del evento que queremos
        // actaluzar y el nuev cntenido
        const eventUpdated = Event.findByIdAndUpdate( eventId, newEvent , {new : true});

        res.status(201).json({
            ok: true,
            eventUpdated
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            sms: 'Por favor hable con el administrador'
        })
    }
}

module.exports = {
    getEvents,
    createEvents,
    deleteEvents,
    updateEvents
}