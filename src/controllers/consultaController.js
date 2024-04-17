import Consulta from "../database/models/Consulta.js";

export const crearConsulta = async (req, res)=>{
    try {
        const consutaNueva= new Consulta(req.body);
        await consutaNueva.save();
        res.status(201).json({
            mensaje: "La consulta fue creado correctamente",
        })
    } catch (error) {
        console.log("🚀 ~ crearConsulta ~ error:", error);
        res.status(400).json({
            mensaje: "No se pudo procesar la solicitud de crear consulta",
        });
    }
};