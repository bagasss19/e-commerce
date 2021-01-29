const {User, Product, Wishlist} = require('../models')

class Controller {
    static async add(req,res,next) {
        try {
            const [wishlist, created] = await Wishlist.findOrCreate({
                where: { ProductId :  req.params.id,UserId : req.userData },
                defaults: {
                    UserId : req.userData,
                    ProductId :  req.params.id
                }
              });
              console.log(created); // The boolean indicating whether this instance was just created
              if (created) res.status(201).json(wishlist)
              else {
                  res.status(400).json({msg : 'wishlist already added'})
                }
        } catch (err) {
            console.log(err);
             next(err)
        }
    }

    static read(req,res,next) {
        Wishlist.findAll({
            include : [Product, User],
            where : {
                UserId : req.userData
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static delete(req,res,next) {
        Wishlist.destroy({
            where : {
                id : req.params.id    
            }
        })
        .then(data => {
            res.status(200).json({msg : 'success delete'})
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }
}

module.exports = Controller