import mongoose from "mongoose";

const cajaSchema = new mongoose.Schema({
    ganancias: {
        type: Number,
        required: true,
      },
      cantidadPedidos: {
        type: Number,
        required: true,
      },
      fechaCierre: {
        type: Date,
        default: Date.now,
      },
})

const Caja = mongoose.model('caja', cajaSchema)
export default Caja