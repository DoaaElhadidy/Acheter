const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const deepPopulate=require('mongoose-deep-populate')(mongoose);
const mongooseAlgolia = require('mongoose-algolia');

const ProductSchema = new Schema({
    category:{type:Schema.Types.ObjectId,ref:'Category'},
    owner:{type:Schema.Types.ObjectId,ref:'User'},
    reviews:[{type:Schema.Types.ObjectId,ref:'Review'}],
    image:String,
    title:String,
    description:String,
    price:Number,
    created:{type:Date,default:Date.now}
},{
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
});

ProductSchema
.virtual('averageRating')
.get(function(){
    var rating = 0;
    if(this.reviews.length == 0){
        rating=0;
    }
    else{
        this.reviews.map((reviews)=>{
            rating += reviews.rating;
        });
        rating = rating / this.reviews.length;
    }
    return rating;
});
ProductSchema.plugin(deepPopulate);


//Search Engine Algolia 
ProductSchema.plugin(mongooseAlgolia,{
  appId: '4G2KXOXKQG',
  apiKey: '31884b4341c942c8fd99beef83e3c3bb',
  indexName: 'ecommerce', //The name of the index in Algolia, you can also pass in a function
  selector: '_id title description image reviews price owner created', //You can decide which field that are getting synced to Algolia (same as selector in mongoose)
  populate: {
    path: 'owner reviews',
    select: 'name rating'
  },
  defaults: {
    author: 'unknown'
  },
  mappings: {
    title: function(value) {
      return `${value}`
    }
  },
  virtuals: {
          avgRating: function(doc)
          {
         var rating = 0;
         if(doc.reviews.length == 0){
             rating=0;
         }
         else{
             doc.reviews.map((reviews)=>{
                 rating += reviews.rating;
             });
             rating = rating / doc.reviews.length;
         }
         return rating;
      }
  },
  debug: true // Default: false -> If true operations are logged out in your console
});
 
let Product = mongoose.model('Product', ProductSchema);
Product.SyncToAlgolia(); //Clears the Algolia index for this schema and synchronizes all documents to Algolia (based on the settings defined in your plugin settings)
Product.SetAlgoliaSettings({
  searchableAttributes: ['title'] //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info.
});
 module.exports = Product;