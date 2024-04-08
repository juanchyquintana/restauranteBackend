import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    estado: {
        type: String,
        required: true,
        trim: true,
        enum: ["disponible", "No disponible"]
    },
    precio: {
        type: Number,
        required: true,
        min: 50,
        max: 10000
    },
    detalle: {
        type: String, 
        required: true,
        trim: true,
        minLength: 50,
        maxLength: 300
    },
    categoria: {
        type: String,
        required: true,
        enum: [
            "Entradas",
            "Platos Principales",
            "Postres",
            "Bebidas",
          ]
    },
    imagen: {
        type: String,
        required: true
    }
})

const Producto = mongoose.model("producto", productoSchema)
export default Producto;