import Pedidos from '../database/models/Pedidos.js';

const obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedidos.find().populate('usuario').populate('productos.producto')
        res.json(pedidos)
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: 'Hubo un error al obtener los pedidos'})
    }
}

const editarPedido = async (req, res) => {}

const validarPedidos = async (req, res, next) => {}


export {
    obtenerPedidos,
    validarPedidos,
    editarPedido
}