
const Product = require('../models/product');


exports.createProduct = async (req,res)=>{
    try {
        const product = await Product.create(req.body)
    .then((product)=>{
        res.status(200).json(product);
    })

    } catch (error) {
        return res.status(500).json({message : 'Error Server'})
    }
}

exports.findProducts = async (req,res)=>{
    try{
    const products = await Product.find({})
    res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({message : 'Error Server'})
    }
}

exports.findProductById = async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({message : 'Error Server'})
    }
}

exports.updateProduct = async(req,res)=>{
    await Product.findByIdAndUpdate(req.params.id, req.body);
    Product.findOne({_id : req.params.id}).then((product)=>{
        res.status(200).json({message : 'Product is updated!', product: product});
    })
}

exports.removeProduct =async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id).then(
        res.send({message : 'Product deleted!'})
    );
}