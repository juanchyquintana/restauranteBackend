import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 100
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    validate: {
        validator: (value) => {
            const pattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
            return pattern.test(value)
        }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: String,
    enum: ["activo", "inactivo"],
    default: "activo",
  },
  tipoUsuario: {
    type: String,
    enum: ["admin", "usuario"],
    default: "usuario",
  },
});

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const Usuario = mongoose.model("Usuarios", usuarioSchema);
export default Usuario;
