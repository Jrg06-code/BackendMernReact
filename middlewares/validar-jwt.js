const jwt  = require('jsonwebtoken')

const validarJWT = (req,res,next)=>{

    const token=req.header('x-token')
console.log(token)
if(!token) {
    return res.status(401).json({
        ok:false,
        msg:'no hay token'
    })
}

try {
    const {uid, name} = jwt.verify(token,process.env.SECRET_JWT_SEED)
        
        req.id = uid;
        req.name = name
} catch (error) {
    res.status(401).json({
        ok:false,
        msg:'token not valid'
    })
}
    next()
}

module.exports = {
    validarJWT
}