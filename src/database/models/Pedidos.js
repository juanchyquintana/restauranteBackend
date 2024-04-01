import mongoose from "mongoose";

const pedidosSchema = new mongoose.Schema({
  usuario: {
    type: String, // Luego cambiar por mongoose.Schema.Types.ObjectId
    // ref: 'Usuario',
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
        type: String, // luego cambiar por mongoose.Schema.Type.ObjectId
        // ref: 'Producto',
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
  telefonoContacto: {
    type: String,
    required: true,
  },
  notas: {
    type: String,
    trim: true,
  },
  total: {
    type: Number,
    required: true
  }
});

const Pedido = mongoose.model('Pedido', pedidosSchema);
export default Pedido;