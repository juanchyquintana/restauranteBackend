import {Router} from 'express'
import { editarUsuario } from '../controllers/usuarioController.js';
import validacionesUsuario from '../helpers/validacionUsuario.js';

const router = Router();

router.route("/usuarios")
router.route("/usuario/:id").put([validacionesUsuario], editarUsuario)
router.route("/productos")
router.route("/pedidos")

export default router