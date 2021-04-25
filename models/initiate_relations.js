//Import Models
const Product = require('./product');
const User = require('./user');
const Cart = require('./cart');
const CartItem = require('./cart-item');
const Order = require('./order');
const OrderItem = require('./order-item');

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
