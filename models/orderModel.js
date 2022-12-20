const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    totalPrice : {
        type : Number,
        default: 0
    },
    Products : [], 
    customer: {
        type : String,
        require: [true, 'required!']
    }
}
,{
    timestamps :true , versionKey : false
       })



module.exports = mongoose.model('Order',orderSchema);