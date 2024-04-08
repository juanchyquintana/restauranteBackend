import Producto from "../database/models/Producto.js";

const editarProducto = async (req, res) => {
  try {
    const buscarProducto = await Producto.findByID(req.params.id);
    if (!buscarProducto) {
      return res.status(404).json({ mensaje: "Producto No Encontrado" });
    }

    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ mensaje: "Producto Editado Correctamente!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al Editar el Pedido" });
  }
};

export { editarProducto };