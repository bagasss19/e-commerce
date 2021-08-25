const {Product} = require('../models')
const uploadFile = require("../middleware/upload");

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

    static async add(req, res, next) {
        try {
            console.log('AAAAAAAAAAAA')
            await uploadFile(req, res);
            if (req.file == undefined) {
                return res.status(400).send({ message: "Please upload a file!" });
            }

            req.body.image_url = 'http://localhost:3000/upload/' + req.file.originalname
            Product.create(req.body)
            res.status(201).send({msg : "Success add product"})
        } catch (err) {
            next(err)
        }
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