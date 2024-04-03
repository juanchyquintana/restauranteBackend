import {Router} from 'express'
import { editarUsuario, obtenerUsuario } from '../controllers/usuarioController.js';
import { obtenerPedidos } from '../controllers/pedidosController.js';
import validacionesUsuario from '../helpers/validacionUsuario.js';

const router = Router();

router.route("/usuarios")
router.route("/usuario/:id").put([validacionesUsuario], editarUsuario).get(obtenerUsuario)
router.route("/productos")


router.route("/pedidos")
    .get(obtenerPedidos)

export default router