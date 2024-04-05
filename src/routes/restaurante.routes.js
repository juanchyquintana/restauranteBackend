import {Router} from 'express'
import { borrarUsuario, editarUsuario, obtenerUsuario } from '../controllers/usuarioController.js';
import { obtenerPedidos, editarPedido } from '../controllers/pedidosController.js';
import { verUsuarios } from '../controllers/usuarioController.js'
import validacionesUsuario from '../helpers/validacionUsuario.js';
import validacionPedidos from '../helpers/validacionPedidos.js';

const router = Router();


router.route("/usuarios").get(verUsuarios)
router.route("/usuario/:id").put([validacionesUsuario], editarUsuario).get(obtenerUsuario).delete(borrarUsuario)
router.route("/productos")


router.route("/pedidos")
    .get(obtenerPedidos)

router.route("/pedidos/:id")
    .put([validacionPedidos], editarPedido)

export default router