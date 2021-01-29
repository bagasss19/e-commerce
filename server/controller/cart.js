const {User, Product, Cart} = require('../models')

class Controller {
    static read(req,res,next) {
        Product.findAll({
            order : [['id', 'ASC']]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static readTransaction(req,res,next) {
        Cart.findAll({
            include : [Product, User],
            where : {
                UserId : req.userData,
                status : true
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

    static async add(req,res,next) {
        try {
            console.log(req.params.id,'<<<<<ini params add');
            const [cart, created] = await Cart.findOrCreate({
                where: { ProductId :  req.params.id,UserId : req.userData, status : false },
                include : [Product],
                defaults: {
                    UserId : req.userData,
                    ProductId :  req.params.id
                }
              });
              console.log(created); // The boolean indicating whether this instance was just created
              if (created) res.status(201).json(cart)
              else {
                //   console.log(cart.Product.stock);
                 if (cart.quantity >= cart.Product.stock) {
                    res.status(400).json({msg : 'maximum stock reached!'})
                 }
                 else {
                    Cart.increment('quantity', { where: { ProductId : req.params.id,  UserId : req.userData, status : false }})
                    res.status(200).json(cart)
                 }
                }
        } catch (err) {
            console.log(err);
             next(err)
        }
    }

    static readCart(req,res,next) {
        Cart.findAll({
            include : [Product, User],
            where : {
                UserId : req.userData,
                status : false
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

    static deleteCart(req,res,next) {
        Cart.destroy({
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

    static increaseQuantiy(req,res,next) {
        Cart.increment('quantity', 
        { where: 
            { id : req.params.id,  
              UserId : req.userData  }})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static decreaseQuantiy(req,res,next) {
        Cart.increment({quantity : -1}, 
        { where: 
            { id : req.params.id,  
              UserId : req.userData  }})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static async checkout(req,res,next) {
          try {
              const data = await  
              Cart.findAll( { where: 
                  {   UserId: req.userData,
                      status : false },
                      include : [Product]
                  })
             if (!data) res.status(404).json({msg : 'cart is empty!'})
            else {
                for (let i = 0; i < data.length; i++) {
                    Product.increment({stock : -data[i].quantity}, 
                    { where: { id : data[i].Product.id}})
                    
                }
               Cart.update({ status: true }, 
                     {   where: {
                           UserId: req.userData,
                           status : false
                         }
                       })
                 res.status(200).json({msg : 'checkout success, enjoy!'})
              }
          } catch (err) {
              console.log(err);
               next(err)
          }
    }
}

module.exports = Controller