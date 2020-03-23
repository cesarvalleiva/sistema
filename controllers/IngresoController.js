import models from '../models';

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Ingreso.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },

    query: async (req, res, next) => {
        try {
            const reg = await models.Ingreso.findOne({_id: req.query._id})
            .pupulate('usuario', {nombre: 1})
            .populate('persona', {nombre: 1});
            if(!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                })
            } else {
                res.status(200).json(reg);
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },

    list: async (req, res, next) => {
        try {
            let valor = req.query.valor
            const reg = await models.Ingreso.find({$or:[{'num_comprobante': new RegExp(valor,'i')},{'serie_comprobante': new RegExp(valor,'i')}]}, {createdAt:0})
            .populate('usuario', nombre: 1)
            .populate('persona', nombre: 1)
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },

    // update: async (req, res, next) => {
    //     try {
    //         const reg = await models.Categoria.findByIdAndUpdate(
    //             {_id: req.body._id},
    //             { nombre:req.body.nombre, descripcion:req.body.descripcion },
    //             {new: true})
    //             res.status(200).json(reg);
    //     } catch (error) {
    //         res.status(500).send({
    //             message: 'Ocurrió un error'
    //         });
    //         next(error);
    //     }
    // },

    // remove: async (req, res, next) => {
    //     try {
    //         const reg = await models.Categoria.findByIdAndDelete({_id:req.body._id})
    //         res.status(200).json(reg);
    //     } catch (error) {
    //         res.status(500).send({
    //             message: 'Ocurrió un error'
    //         });
    //         next(error);
    //     }
    // },

    activate: async (req, res, next) => {
        try {
            const reg = await models.Ingreso.findByIdAndUpdate({_id:req.body._id}, {estado:1}, {new:true})
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },

    deactivate: async (req, res, next) => {
        try {
            const reg = await models.Ingreso.findByIdAndUpdate({_id:req.body._id}, {estado:0}, {new:true})
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    }
}