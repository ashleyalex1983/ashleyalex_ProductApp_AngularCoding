const mongoose = require ('mongoose');

// mongoose.connect('mongodb://localhost:27017/ProductDB');

const Schema = mongoose.Schema;
 
const ProductSchema = new Schema({
    productId      :   Number,
    productName    :   String,
    productCode    :   String,
    productDesc    :   String,
    releaseDate     :   String,
    price           :   Number,
    starRating      :   Number,
    imageUrl        :   String
});

// //override toJSON method
// ProductSchema.method("toJSON",()=>{
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
// })

var Productdata = mongoose.model('product',ProductSchema);

module.exports = Productdata ;
