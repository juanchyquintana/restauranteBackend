import mongoose from "mongoose";
import 'dotenv/config';

const mongoBDD = process.env.MONGODB_BDD;

mongoose.connect(mongoBDD);

const datosDeLaConexion = mongoose.connection;
datosDeLaConexion.once('open', ()=>{
    console.log('Base de datos conectada')
})
