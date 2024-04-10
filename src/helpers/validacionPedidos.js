import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionPedidos = [
  check("usuario")
    .notEmpty()
    .withMessage("El usuario es un dato obligatorio.")
    .isLength({ min: 3, max: 100 })
    .withMessage("El usuario debe tener entre 3 y 100 caracteres."),
  check("fecha").notEmpty().withMessage("La fecha es un dato obligatorio."),
  check("productos")
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos un producto en el pedido."),
  check("productos.*.producto")
    .notEmpty()
    .withMessage("El producto es un dato obligatorio."),
  check("productos.*.cantidad")
    .notEmpty()
    .withMessage("La cantidad es un dato obligatorio.")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un número entero mayor que cero."),
  check("estado")
    .notEmpty()
    .withMessage("El estado es un dato obligatorio.")
    .isIn(["pendiente", "en proceso", "enviado", "entregado", "cancelado"])
    .withMessage(
      'El estado debe ser una de las siguientes opciones: "pendiente", "en proceso", "enviado", "entregado", "cancelado".'
    ),
  check("tipoEntrega")
    .notEmpty()
    .withMessage("El tipo de entrega es un dato obligatorio.")
    .isIn(["take-away", "delivery", "bar"])
    .withMessage(
      'El tipo de entrega debe ser una de las siguientes opciones: "take-away", "delivery", "bar".'
    ),
  check("lat")
    .notEmpty()
    .withMessage("La latitud es un dato obligatorio para entregas a domicilio.")
    .if((value, { req }) => req.body.tipoEntrega === "delivery"),
  check("lng")
    .notEmpty()
    .withMessage(
      "La longitud es un dato obligatorio para entregas a domicilio."
    )
    .if((value, { req }) => req.body.tipoEntrega === "delivery"),
  check("telefonoContacto")
    .notEmpty()
    .withMessage("El teléfono de contacto es un dato obligatorio."),
  check("notas").optional(),
  check("total")
    .notEmpty()
    .withMessage("El total es un dato obligatorio.")
    .isFloat({ min: 0 })
    .withMessage("El total debe ser un número positivo."),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionPedidos;