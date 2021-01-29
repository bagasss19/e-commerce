const {Product} = require('../models')

class Controller {
    static read(req,res,next) {
        Product.findAll({
            order : [['updatedAt', 'ASC']]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static readId(req,res,next) {
        console.log(req.params.id);
        Product.findOne({
            where : {
                id : req.params.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
            console.log(err);
        })
    }

    static add (req,res,next) {
        Product.create(req.body)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static edit (req,res,next) {
        Product.update(req.body, {
            where : {
                id : req.params.id
            },
            returning : true
        })
        .then(data => {
            res.status(200).json(data[1][0])
        })
        .catch(err => {
            next(err)
        })
    }

    static delete (req,res,next) {
        Product.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(data => {
            res.status(200).json(`Product success to delete`)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller