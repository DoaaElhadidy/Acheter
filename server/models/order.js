const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate=require('mongoose-deep-populate')(mongoose);

const OrderSchema = new Schema({
    owner:{type:Schema.Types.ObjectId, ref: 'User'},
    totalPrice:{type:Number,default:0},
    products:[{
        prod:{type:Schema.Types.ObjectId ,ref: 'Product'},
        quantity:{type:Number,default:1}
    }]
});

OrderSchema.plugin(deepPopulate);

const Order = mongoose.model('Order', OrderSchema);

 module.exports = Order; 
