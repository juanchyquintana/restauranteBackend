import Caja from "../database/models/Caja.js";

const cerrarCaja = async (req, res) => {
  try {
    const caja = new Caja(req.body);
    await caja.save();

    res
      .status(200)
      .json({ mensaje: "Caja Cerrada Exitosamente!", datosCaja: caja });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al Cerrar la Caja" });
  }
};

const crearCaja = async (req, res) => {
  const datosCaja = req.body;

  try {
    const nuevaCaja = new Caja({
      cantidadPedidos: datosCaja.cantidadPedidos.length,
      ganancias: datosCaja.ganancias,
      fechaCierre: datosCaja.fechaCierre,
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
      return res
        .status(404)
        .json({ mensaje: "No existe una caja para esa fecha." });
    }

    await Caja.findOneAndUpdate({ fecha }, datosCaja);

    res.status(200).json({ mensaje: "Caja editada exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al editar la caja." });
  }
};

const filtrandoFechaCaja = async (req, res) => {
  const { fecha } = req.params;

  try {
    const cajas = await Caja.find({ fechaCierre: fecha });

    if (cajas.length > 0) {
      return res.status(200).json(cajas);
    } else {
      return res.status(400).json({ mensaje: "No hay Cajas con esa Fecha" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al filtrar cajas." });
  }
};

export { cerrarCaja, crearCaja, editarCaja, filtrandoFechaCaja };
