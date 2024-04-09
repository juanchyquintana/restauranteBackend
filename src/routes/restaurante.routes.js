import { Router } from "express";
import {
  editarUsuario,
  obtenerUsuario,
  crearUsuario,
  borrarUsuario,
  verUsuarios,
} from "../controllers/usuarioController.js";
import {
  editarProducto,
  obtenerProducto,
  listarProductos,
} from "../controllers/productoController.js";
import {
  obtenerPedidos,
  editarPedido,
  crearPedido,
  obtenerPedidoPorId,
} from "../controllers/pedidosController.js";
import validacionesUsuario from "../helpers/validacionUsuario.js";
import validacionProducto from "../helpers/validacionProducto.js";
import validacionPedidos from "../helpers/validacionPedidos.js";

const router = Router();

router
  .route("/usuarios")
  .get(verUsuarios)
  .post(validacionesUsuario, crearUsuario);
router
  .route("/usuarios/:id")
  .put([validacionesUsuario], editarUsuario)
  .get(obtenerUsuario)
  .delete(borrarUsuario);

router.route("/productos").get(listarProductos);
router
  .route("/productos/:id")
  .put([validacionProducto], editarProducto)
  .get(obtenerProducto);

router
  .route("/pedidos")
  .post([validacionPedidos], crearPedido)
  .get(obtenerPedidos);
router.route("/pedidos/:id").put([validacionPedidos], editarPedido).get(obtenerPedidoPorId);

export default router;
