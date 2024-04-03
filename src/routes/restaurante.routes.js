import {Router} from 'express'
import { editarUsuario } from '../controllers/usuarioController.js';
import { obtenerPedidos, editarPedido, validarPedidos } from '../controllers/pedidosController.js';
import validacionesUsuario from '../helpers/validacionUsuario.js';
import validacionPedidos from '../helpers/validacionPedidos.js';

const router = Router();

router.route("/usuarios")
router.route("/usuario/:id").put([validacionesUsuario], editarUsuario)
router.route("/productos")


router.route("/pedidos")
    .get(obtenerPedidos)

router.route("/pedidos/:id")
    .put([validacionPedidos], editarPedido)

export default router