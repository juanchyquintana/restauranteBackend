import Pedido from "../database/models/Pedido.js";
import Caja from "../database/models/Caja.js";

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

const cerrarCaja = async (req, res) => {
  try {
    const caja = new Caja(req.body);
    await caja.save()

    res.status(200).json({ mensaje: "Caja Cerrada Exitosamente!", datosCaja: caja });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al Cerrar la Caja" });
  }
};

const crearCaja = async (req, res) => {
  const { fecha } = req.params;
  const { datosCaja } = req.body;

  const fechaActual = new Date(fecha);
  const soloFecha = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());
  const fechaFiltro = soloFecha.toISOString();

  console.log(fechaActual)

  try {
    const cajaExistente = await Caja.findOne({ fecha });

    if (cajaExistente) {
      return res.status(400).json({ mensaje: "Ya existe una caja para esa fecha." });
    }

    const nuevaCaja = new Caja({
      fecha,
      ...datosCaja,
    });

    await nuevaCaja.save();

    res.status(201).json({ mensaje: "Caja creada exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la caja." });
  }
};

const editarCaja = async (req, res) => {
  const { fecha } = req.params;
  const { datosCaja } = req.body;

  try {
    const cajaExistente = await Caja.findOne({ fecha });

    if (!cajaExistente) {
      return res.status(404).json({ mensaje: "No existe una caja para esa fecha." });
    }

    await Caja.findOneAndUpdate({ fecha }, datosCaja);

    res.status(200).json({ mensaje: "Caja editada exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al editar la caja." });
  }
};

const filtrandoFechaCaja = async (req, res) => {
  const { fecha } = req.query;

  try {
    const cajas = fecha ? await Caja.find({ fecha }) : await Caja.find();
    res.json(cajas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al filtrar cajas." });
  }
}

export {
  obtenerPedidos,
  editarPedido,
  crearPedido,
  obtenerPedidoPorId,
  eliminarPedido,
  obtenerGananciasDelDia,
  obtenerCantidadPedidosDia,
  cerrarCaja,
  crearCaja,
  editarCaja,
  filtrandoFechaCaja
};
