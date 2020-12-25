const mongoose = require ('mongoose');

// mongoose.connect('mongodb://localhost:27017/ProductDB');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
            product_Id      :   Number,
            product_Name    :   String,
            product_Code    :   String,
            product_Desc    :   String,
            releaseDate     :   String,
            product_Price   :   Number,
            product_Rating  :   Number,
            product_imageUrl:   String,
            product_image   :   { data: Buffer, contentType: String }
});

var Productdata = mongoose.model('product',ProductSchema);

module.exports = Productdata ;