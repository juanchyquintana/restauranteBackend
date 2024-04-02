import { check } from "express-validator";

const validacionesUsuario = [
  check("nombre")
    .notEmpty()
    .withMessage("El nombre del usuario es un dato obligatorio.")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre de usuario debe tener entre 3 y 100 caracteres."),
  check("email")
    .notEmpty()
    .withMessage("El email del usuario es un dato obligatorio.")
    .matches(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
    )
    .withMessage(
      `El email ingresado no corresponde con el formato solicitado "${/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i}" `
    )
    .isLength({ min: 3, max: 254 })
    .withMessage("El email debe tener entre 3 y 254 caracteres."),
  check("password")
    .notEmpty()
    .withMessage("El password del usuario es un dato obligatorio.")
    .isLength({ min: 8, max: 64 })
    .withMessage("El password de usuario debe tener entre 8 y 64 caracteres."),
  check("estado")
    .notEmpty()
    .withMessage("El estado del usuario es un dato obligatorio.")
    .isIn(["activo", "inactivo"])
    .withMessage(
      'La categoria debe ser una de las siguientes opciones: "activo", "inactivo".'
    ),
  check("tipoUsuario")
    .notEmpty()
    .withMessage("El tipo de usuario es un dato obligatorio.")
    .isIn(["admin", "usuario"])
    .withMessage(
      'El tipo de usuario debe ser una de las siguientes opciones "admin", "usuario".'
    ),
];

export default validacionesUsuario;
