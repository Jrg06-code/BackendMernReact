const {Router} = require('express')
const router = Router();
const {getEventos,crearEvento,actualizarEvento,eliminarEvento}=require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const {check} = require('express-validator')

const {validarCampos} = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

//TODAS TIENEN QUE PASAR POR LA VALIDACION DEL TOKEN
router.use(validarJWT)
//Obtener eventos
router.get('/', getEventos)
//Crear un nuevo eventos
router.post('/',[
    check('title','el titulo es obligatorio').not().isEmpty(), 
    check('start','la fecha de inicio es obligatoria').custom(isDate),
    check('end','la fecha finalizacion es obligatorio').custom(isDate),
    
    validarCampos], crearEvento)
//Actualizar
router.put('/:id', actualizarEvento)
//Eliminar evento
router.delete('/:id', eliminarEvento)

module.exports= router
