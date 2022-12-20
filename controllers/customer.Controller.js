
const User = require('../models/authentication');

exports.findCustomers = async (req,res)=>{
    try{
    const customers = await User.find({role : "CUSTOMER"})
     res.send(customers)
    } catch (error) {
        return res.status(500).json({message : 'Error Server'})
    }
}

exports.findCustomerById = async (req,res)=>{
    try {
        const customer = await User.findById(req.params.id);
            res.send(customer);
    } catch (error) {
        return res.status(500).json({message : 'Error Server'})
    }
}

exports.updateCustomer = async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id, req.body);
    User.findOne({_id : req.params.id}).then((user)=>{
        res.send({message : 'customer is updated!'});
    })
}

exports.removeCustomer =async(req,res)=>{
    await User.findByIdAndDelete(req.params.id).then(
        res.send({message : 'customer deleted!'})
    );
}