const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CategorySchema=new Schema({
    name:{type:String,unique:true,lowercase:true},
    created:{type:Date,default:Date.now}
});

const Category = mongoose.model('Category', CategorySchema);

 module.exports = Category;