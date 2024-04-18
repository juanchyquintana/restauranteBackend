import mongoose from "mongoose";

const consultaSchema = new mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        minLength: 2,
        maxLength: 50
    },
    email:{
        type: String,
        lowercase: true,
        // unique: true,
        trim: true,
        validate: {
            validator: (value) => {
                const pattern =
                /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
                return pattern.test(value);
            },
        },
    },
    mensaje:{
        type: String,
        require: true,
        minLength: 10,
        maxLength: 500
    },
    fecha: {
        type: Date,
        default: Date.now(),
        required: true,
      }
});

const Consulta = mongoose.model("consulta",consultaSchema);

export default Consulta;