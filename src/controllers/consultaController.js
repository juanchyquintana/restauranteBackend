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

export const listarConsultas = async (req, res) => {
    try {
      const consultas = await Consulta.find();
      res.status(200).json(consultas);
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .json({ mensaje: "No se pudo encontrar la lista de consultas" });
    }
  };