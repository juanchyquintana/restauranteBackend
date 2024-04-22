import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionCaja = [
  check("ganancias")
    .notEmpty()
    .withMessage("Las Ganancias es un dato obligatorio.")
    .isNumeric()
    .withMessage("Tienen que ser números"),
  check("cantidadPedidos")
    .notEmpty()
    .withMessage("La Cantidad de Pedidos es un dato obligatorio."),
  check("fechaCierre")
    .notEmpty()
    .withMessage("La Fecha de Cierre es un dato obligatorio."),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionCaja;
