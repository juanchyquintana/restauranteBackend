import Pedido from "../database/models/Pedido.js";

const crearPedido = async (req, res) => {
  try {
    const nuevoPedido = new Pedido(req.body);
    await nuevoPedido.save();

    res.status(201).json({ mensaje: "El pedido fue creado correctamente." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ mensaje: "No se pudo crear el pedido." });
  }
};

const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate("usuario", "-password -__v")
      .populate("productos.producto");

    res.json(pedidos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error al obtener los pedidos." });
  }
};

const obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
      .populate("usuario", "-password -tipoUsuario -__v -estado")
      .populate("productos.producto", "-__v");

    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado." });
    }

    res.json(pedido);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al obtener el pedido." });
  }
};

const editarPedido = async (req, res) => {
  try {
    const buscarPedido = await Pedido.findById(req.params.id);
    if (!buscarPedido) {
      return res.status(404).json({ mensaje: "Producto No Encontrado." });
    }

    await Pedido.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ mensaje: "Producto Editado Correctamente!." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al Editar el Pedido." });
  }
};

const eliminarPedido = async (req, res) => {
  try {
    const pedidoEliminado = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedidoEliminado) {
      return res.status(404).json({ mensaje: "Pedido no encontrado." });
    }

    res.json({ mensaje: "Pedido eliminado correctamente." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al eliminar el pedido." });
  }
};

const obtenerGananciasDelDia = async (req, res) => {
  try {
    const ganancias = await Pedido.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
        },
      },
    ]);

    res.status(200).json({ ganancias: ganancias[0]?.total || 0 });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al obtener las ganancias del día" });
  }
};

const obtenerCantidadPedidosDia = async (req, res) => {
  try {
    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);

    const cantidadPedidos = await Pedido.countDocuments({
      fecha: { $gte: fechaHoy },
    });

    res.status(200).json({ cantidad: cantidadPedidos });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener la cantidad de pedidos del día." });
  }
};

export {
  obtenerPedidos,
  editarPedido,
  crearPedido,
  obtenerPedidoPorId,
  eliminarPedido,
  obtenerGananciasDelDia,
  obtenerCantidadPedidosDia,
};
