const {validationResult}= require('express-validator')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/JWT')

const crearUsuario = async (req,res)=>{

    const {email,password} = req.body;  

try {
    let usuario = await Usuario.findOne({email})
   
    if(usuario){
        return res.status(400).json({
            ok:false,
            msg:'un usuario existe con ese correo'
        })
    }
  usuario = new Usuario(req.body)
//Encriptar contrasena
const salt = bcrypt.genSaltSync(10);
usuario.password = bcrypt.hashSync(password, salt);

await usuario.save();
//Generar JWT

const token = await generarJWT(usuario.id,usuario.name)

    res.status(201).json({
        ok:true,
        uuid:usuario.id,
        name:usuario.name,
        token
        
    })
} catch (error) {
    console.log(error)
    res.status(500).json({
        ok:false,
        msg: 'Por favor hable con el administrador'
    })
}
   
}

const loginUsuario=async (req,res)=>{
   

    const {email,password} = req.body;

    try {

        const usuario = await Usuario.findOne({email})
   
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'el usuario no existe'
            })
        }
        
        //confirmar password
        const validPassword = bcrypt.compareSync(password,usuario.password)
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'password incorrecto'
            })
        }
        //Generar nuestro JWT
        const token = await generarJWT(usuario.id,usuario.name)
        res.json({
            ok:true,
            uuid:usuario.id,
            name:usuario.name,
            token
        })
    } catch (error) {
        console.log(error)
    res.status(500).json({
        ok:false,
        msg: 'Por favor hable con el administrador'
    })
    }

    
   
}



const revalidarToken = async(req,res)=>{

    const {id, name} = req

    //Generar un nuevo JWT y retornarlo
    const token = await generarJWT(id,name)
    res.json({
        msg:"renew",
        uuid:id,
        name,
        token
        
    })
   
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
