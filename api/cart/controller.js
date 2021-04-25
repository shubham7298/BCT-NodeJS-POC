const Product= require('../../models/product');
const User = require('../../models/user');

exports.getCart = (req, res, next) => {

  User.findOne({where:{id:req.userId}})
  .then(result=>{
    return result;
  })
  .then(usr=>{
    usr.getCart()
    .then(cart => {
      if(!cart){
        return usr.createCart()
      }
      return cart
    })
    .then(cart=>{
      cart.getProducts()
      .then(products => {
          res.status(200).json({ message:"Cart Fetched", product:products });
      })
      .catch(err => console.log(err));
    })
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
}


exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  User.findOne({where:{id:req.userId}})
  .then(result=>{
    return result;
  })
  .then(usr=>{
    usr.getCart()
    .then(cart => {
      if(!cart){
        return usr.createCart();
      }
      return cart;
    })
    .then(crt=>{
      fetchedCart = crt;
      return crt.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.status(200).json({ message:"Cart Made"});
    })
    .catch(err => console.log(err));
  
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
    
};


exports.cartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  User.findOne({where:{id:req.userId}})
  .then(result=>{
    return result;
  })
  .then(user=>{
    user.getCart()
    .then(cart => {
      if(!cart){
        res.status(400).json({message:"Cart Not Found"});
        const error = new Error('Cart not Created yet');
        error.statusCode = 401;
        throw error;
      }
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      if(!product){
        res.status(400).json({message:"Product Not Found"});
        const error = new Error('Product not Created yet');
        error.statusCode = 401;
        throw error;
      }
      return product.cartItem.destroy();
    })
    .then(result => {
      res.status(200).json({ message:"Item Deleted"});
    })
    .catch(err => console.log(err));
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};