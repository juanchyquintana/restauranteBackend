import mongoose from "mongoose";
import Usuario from "./Usuario.js";
import Producto from "./Producto.js";

const pedidosSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Usuario,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Producto,
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
    },
  ],
  estado: {
    type: String,
    enum: ["pendiente", "en proceso", "enviado", "entregado", "cancelado"],
    default: "pendiente",
    required: true,
  },
  tipoEntrega: {
    type: String,
    enum: ["take-away", "delivery", "bar"],
    required: true,
  },
  lat: {
    type: Number,
    required: function () {
      return this.tipoEntrega === "delivery";
    },
  },
  lng: {
    type: Number,
    required: function () {
      return this.tipoEntrega === "delivery";
    },
  },
  calle: {
    type: String,
    required: function () {
      return this.tipoEntrega === "delivery";
    },
  },
  telefonoContacto: {
    type: Number,
    required: function () {
      return this.tipoEntrega === "delivery";
    },
  },
  notas: {
    type: String,
    trim: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const Pedido = mongoose.model("Pedido", pedidosSchema);
export default Pedido;
