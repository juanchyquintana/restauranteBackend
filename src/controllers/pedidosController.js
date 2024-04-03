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

const editarPedido = async (req, res) => {
    try {
        const buscarPedido = await Pedidos.findById(req.params.id)
        if(!buscarPedido) {
            return res.status(404).json({ mensaje: 'Producto No Encontrado'})
        }

        await Pedidos.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ mensaje: "Producto Editado Correctamente!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: 'Error al Editar el Pedido' })
    }
}

const validarPedidos = async (req, res, next) => {}


export {
    obtenerPedidos,
    validarPedidos,
    editarPedido
}