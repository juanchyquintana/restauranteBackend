import Usuario from "../database/models/Usuario.js";

export const editarUsuario = async (req, res) => {
  try {
    const buscarProducto = await Usuario.findById(req.params.id);
    if (!buscarProducto) {
      return res
        .status(404)
        .json({ mensaje: "No se pudo editar el usuario, el id es incorrecto" });
    }

    await Usuario.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ mensaje: "El usuario fue modificado exitosamente" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar editar un usuario" });
  }
};
