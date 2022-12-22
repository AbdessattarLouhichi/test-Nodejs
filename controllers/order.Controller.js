
const Product = require('../models/product');
const Order = require('../models/orderModel');
const User = require('../models/authentication');



exports.order = async(req, res)=>{
  
	try{	
        let Price = 0;
		const customer = req.user._id;
		await  req.body.map(async (item)=>{ 
                            
                            const product = await Product.findById(item._id);
							await Product.findByIdAndUpdate(product._id, { $inc : {quantity : -1}},{new : true})
                            Price = Price + product.price
                           
						})
        
		 await Order.create({totalPrice: Price, Products : req.body, customer: customer})
			.then((order) =>{
						 res.status(200).json({message : 'Success Order!', order : order})
					})

	}catch(error){
		res.status(500).send({message : 'Server Error'})

	}
}

exports.findOrders = async (req,res)=>{
    try{
    const orders = await Order.find({})
    res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({message : 'Error Server'})
    }
}

exports.findOrderById = async (req,res)=>{
    try {
        const order = await Order.findById(req.params.id);
        res.status(201).json(order);
    } catch (error) {
        return res.status(500).json({message : 'Error Server'})
    }
}


exports.removeOrder =async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id).then(
        res.send({message : 'Order deleted!'})
    );
}