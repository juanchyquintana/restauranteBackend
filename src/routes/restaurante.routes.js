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
  crearProducto,
  borrarProducto,
} from "../controllers/productoController.js";
import {
  obtenerPedidos,
  editarPedido,
  crearPedido,
  obtenerPedidoPorId,
  eliminarPedido,
} from "../controllers/pedidosController.js";
import validacionesUsuario from "../helpers/validacionUsuario.js";
import validacionProducto from "../helpers/validacionProducto.js";
import validacionPedidos from "../helpers/validacionPedidos.js";

const router = Router();

router
  .route("/usuarios")
  .get(verUsuarios)
  .post([validacionesUsuario], crearUsuario);
router
  .route("/usuarios/:id")
  .put([validacionesUsuario], editarUsuario)
  .get(obtenerUsuario)
  .delete(borrarUsuario);

router
  .route("/productos")
  .get(listarProductos)
  .post([validacionProducto], crearProducto);
router
  .route("/productos/:id")
  .put([validacionProducto], editarProducto)
  .get(obtenerProducto)
  .delete(borrarProducto);

router
  .route("/pedidos")
  .post([validacionPedidos], crearPedido)
  .get(obtenerPedidos);
router
  .route("/pedidos/:id")
  .put([validacionPedidos], editarPedido)
  .get(obtenerPedidoPorId)
  .delete(eliminarPedido);

export default router;