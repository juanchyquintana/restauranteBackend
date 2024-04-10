import { Router } from "express";
import {
  editarUsuario,
  obtenerUsuario,
  crearUsuario,
  borrarUsuario,
  verUsuarios,
  iniciarSesion,
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
import validarJWT from "../helpers/verificarJWT.js";

const router = Router();

router
  .route("/usuarios")
  .get(verUsuarios)
  .post([validacionesUsuario], crearUsuario);
router
  .route("/usuarios/:id")
  .put([validarJWT, validacionesUsuario], editarUsuario)
  .get(obtenerUsuario)
  .delete(validarJWT, borrarUsuario);

router.route("/usuarios/login").post(iniciarSesion);

router
  .route("/productos")
  .get(listarProductos)
  .post([validarJWT, validacionProducto], crearProducto);
router
  .route("/productos/:id")
  .put([validarJWT, validacionProducto], editarProducto)
  .get(obtenerProducto)
  .delete(validarJWT, borrarProducto);

router
  .route("/pedidos")
  .post([validacionPedidos], crearPedido)
  .get(obtenerPedidos);
router
  .route("/pedidos/:id")
  .put([validarJWT, validacionPedidos], editarPedido)
  .get(obtenerPedidoPorId)
  .delete(validarJWT, eliminarPedido);

export default router;