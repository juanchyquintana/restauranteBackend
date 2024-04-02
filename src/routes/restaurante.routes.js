import {Router} from 'express'
import { obtenerPedidos } from '../controllers/pedidosController.js';

const router = Router();

router.route("/usuarios")
router.route("/productos")


router.route("/pedidos")
    .get(obtenerPedidos)

export default router