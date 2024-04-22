import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionConsulta = [
    check("nombre")
      .notEmpty()
      .withMessage("El Nombre es un dato obligatorio.")
      .isLength({ min: 2, max: 50 })
      .withMessage("El Nombre debe tener entre 2 y 50 caracteres."),
    check("email")
      .notEmpty()
      .withMessage("El email es un dato obligatorio.")
      .matches(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
      )
      .withMessage(
        `El email ingresado no corresponde con el formato solicitado "${/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i}" `
      )
      .isLength({ min: 3, max: 254 })
      .withMessage("El email debe tener entre 3 y 254 caracteres."),
    check("mensaje")
      .notEmpty()
      .withMessage("El mensaje es un dato obligatorio.")
      .isLength({ min: 10, max: 500 })
      .withMessage("El mensaje debe tener entre 10 y 500 caracteres."),
    check("fecha")
      .notEmpty()
      .withMessage("La fecha es un dato obligatorio."),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
  ];
  
  export default validacionConsulta;
  