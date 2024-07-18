const Evento = require('../models/Evento')

const crearEvento = async (req,res)=>{

    //verificar que tenga el evento
    const evento = new Evento(req.body);
    try {
        evento.user = req.id
        const eventoGuardado =await evento.save();
        res.json({
            ok:true,
            evento:eventoGuardado

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }
    
    res.json({
        ok: true,
        msg: 'crear evento'
    })
    

}
const eliminarEvento = async (req,res)=>{

    const eventoID = req.params.id

    try {

        const evento = await Evento.findById(eventoID)
        const id=req.id

        if(!evento){
           return  res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }
        if(evento.user.toString() !== id){
            
            return res.status(401).json({
                ok:false,
                msg: 'no tiene privilegio de eliminar este evento'
            })}

           

      
            const eventoeliminado= await Evento.findByIdAndDelete(eventoID)

            res.json({
                ok:true,
                eventoeliminado
            })
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"hable con el administrador"
        })
    }

   

}
const actualizarEvento = async(req,res)=>{

    const eventoID = req.params.id

    try {

        const evento = await Evento.findById(eventoID)
        const id=req.id

        if(!evento){
            res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }
        if(evento.user.toString() !== id){
            
            return res.status(401).json({
                ok:false,
                msg: 'no tiene privilegio de editar este evento'
            })}

            const nuevoEvento = {
                ...req.body,
                user:id
            }

            const eventoActualizado= await Evento.findByIdAndUpdate(eventoID, nuevoEvento, {new:true})

            res.json({
                ok:true,
                eventoActualizado
            })
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"hable con el administrador"
        })
    }

    res.json({
        ok: true,
        eventoID
    })
}
const getEventos = async(req,res)=>{

    const eventos = await Evento.find().populate('user','name');
    res.json({
        ok: true,
        eventos
    })
}

module.exports = {
    crearEvento,getEventos,eliminarEvento,actualizarEvento
}