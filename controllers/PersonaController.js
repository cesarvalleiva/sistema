import models from '../models';

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Persona.create(req.body);
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
            const reg = await models.Persona.findOne({_id: req.query._id})
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
            const reg = await models.Persona.find({$or:[{'nombre': new RegExp(valor,'i')},{'email': new RegExp(valor,'i')}]}, {createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },

    listClientes: async (req, res, next) => {
        try {
            let valor = req.query.valor
            const reg = await models.Persona.find({$or:[{'nombre': new RegExp(valor,'i')},{'email': new RegExp(valor,'i')}], 'tipo_persona': 'Cliente'}, {createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },

    listProveedores: async (req, res, next) => {
        try {
            let valor = req.query.valor
            const reg = await models.Persona.find({$or:[{'nombre': new RegExp(valor,'i')},{'email': new RegExp(valor,'i')}], 'tipo_persona': 'Proveedor'}, {createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const reg = await models.Persona.findByIdAndUpdate(
                {_id: req.body._id},
                { tipo_persona: req.body.tipo_persona,
                  nombre: req.body.nombre,
                  tipo_documento:req.body.tipo_documento,
                  num_documento:req.body.num_documento,
                  direccion: req.body.direccion,
                  telefono: req.body.telefono,
                  email: req.body.email },
                  {new: true});
                res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            const reg = await models.Persona.findByIdAndDelete({_id:req.body._id})
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },

    activate: async (req, res, next) => {
        try {
            const reg = await models.Persona.findByIdAndUpdate({_id:req.body._id}, {estado:1}, {new:true})
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
            const reg = await models.Persona.findByIdAndUpdate({_id:req.body._id}, {estado:0}, {new:true})
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    }
}