const express = require ('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const db_url = 'mongodb://localhost:27017/ProductDB';
var ObjectId = require('mongoose').Types.ObjectId;

const Productdata =require('./src/model/Productdata');


var app = new express();

const port = process.env.PORT || 3000;

//Database connection
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error)=>{
    if(!error)
    {
        console.log('Success - Database Connected.');
    }
    else{
        console.log('Error - Unable to connect Database.')
    }
});

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());

app.get('/products',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS")
    Productdata.find() //.sort({_id:-1})
        .then(function(products){
            res.send(products);
        });
});

app.post('/insert',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS")
    console.log(req.body);

    var product_item ={
        // productId      :   req.body.product.productId,
        productName    :   req.body.product.productName,
        productCode    :   req.body.product.productCode,
        productDesc    :   req.body.product.description,
        releaseDate     :   req.body.product.releaseDate,
        price           :   req.body.product.price,
        starRating      :   req.body.product.starRating,
        imageUrl        :   req.body.product.imageUrl
    }

    var product = Productdata(product_item);
    product.save();

});

app.get('/products/:id',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS")
    //console.log(req.params.id);
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    const productid = req.params.id;
    Productdata.findById({_id: productid})
        .then(function(product){
            console.log(product);
            res.send(product);
        })
})

app.put('/products/:id',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS")
    console.log(req.body);
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    const productid = req.params.id;
    var product_item = {
        _id             :   req.params.id,
        // productId       :   req.body.productId,
        productName     :   req.body.productName,
        productCode     :   req.body.productCode,
        productDesc     :   req.body.description,
        releaseDate     :   req.body.releaseDate,
        price           :   req.body.price,
        starRating      :   req.body.starRating,
        imageUrl        :   req.body.imageUrl
    };

    var product = Productdata(product_item);
    Productdata.findByIdAndUpdate(req.params.id, product, {}, (error)=>{
        console.log(error);
    })
})

app.delete('/products/:id',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS")
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    console.log(req.params.id);
    Productdata.findByIdAndDelete({_id:req.params.id}, (error)=>{
        console.log(error);
    })
    
})


app.listen(port,(error)=>{
    if(!error)
    {
        console.log("Server Ready at "+ port);
    }
    else{
        console.log('Error Occurred');
    }
    
});