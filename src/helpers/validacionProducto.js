import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionProducto = [
  check("nombre")
    .notEmpty()
    .withMessage("El Nombre es un dato obligatorio.")
    .isLength({ min: 2, max: 50 })
    .withMessage("El Nombre debe tener entre 2 y 50 caracteres."),
  check("estado")
    .notEmpty()
    .withMessage("El Estado es un dato obligatorio.")
    .isIn(["disponible", "no disponible"])
    .withMessage("El Estado debe ser 'disponible' o 'no disponible'."),
  check("precio")
    .notEmpty()
    .withMessage("El Precio es un dato obligatorio.")
    .isFloat({ min: 50, max: 10000 })
    .withMessage("El Precio debe ser un número entre 50 y 10000."),
  check("detalle")
    .notEmpty()
    .withMessage("El Detalle es un dato obligatorio.")
    .isLength({ min: 50, max: 300 })
    .withMessage("El Detalle debe tener entre 50 y 300 caracteres."),
  check("categoria")
    .notEmpty()
    .withMessage("La Categoría es un dato obligatorio.")
    .isIn(["Entradas", "Platos Principales", "Postres", "Bebidas"])
    .withMessage(
      "La Categoría debe ser 'Entradas', 'Platos Principales', 'Postres' o 'Bebidas'."
    ),
  check("imagen").notEmpty().withMessage("La Imagen es un dato obligatorio."),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionProducto;