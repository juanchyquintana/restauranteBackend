import Usuario from "../database/models/Usuario.js";

export const editarUsuario = async (req, res) => {
  try {
    const buscarUsuario = await Usuario.findById(req.params.id);
    if (!buscarUsuario) {
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

export const obtenerUsuario = async (req, res) => {
  try {
    console.log(req.params.id);
    //si encontre el usuario
    const usuarioBuscado = await Usuario.findById(req.params.id);
    res.status(200).json(usuarioBuscado);
  } catch (error) {
    console.log(error);
    res.status(404).json({ mensaje: "No se encontro el usuario solicitado" });
  }
};

export const verUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error){
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

export const borrarUsuario = async (req, res) => {
  try {
    const buscarUsuario = await Usuario.findById(req.params.id);
    if (!buscarUsuario) {
      return res
        .status(404)
        .json({
          mensaje: "No se pudo eliminar el usuario, el id es incorrecto.",
        });
    }
    await Usuario.findByIdAndDelete(req.params.id);

    res.status(200).json({ mensaje: "El usuario fue eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar borrar el usuario" });
  }
};