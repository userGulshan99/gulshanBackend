const jwt = require('jsonwebtoken');

const Razorpay = require("razorpay")
const { Order } = require("../models/order.models.js");

// to generate initial order and get order id from razorpay
const purchasePremium = async (req, res, next) => {
    try {

        const razorpay = new Razorpay({
            key_id : process.env.RAZORPAY_KEY_ID,
            key_secret : process.env.RAZORPAY_KEY_SECRET
        });
        
        razorpay.orders.create({amount : 100, currency : "INR"}, (err, order)=>{
                req.user.createOrder({
                    orderid : order.id,
                    status : 'PENDING'
                })
                .then(()=>{
                    return res.status(201).json({order, key_id : razorpay.key_id});
                })
                .catch((err)=>{
                    throw new Error(err);
                })
        });

    } catch (error) {
        return res.status(400).json({'Error' : error, 'Message' : 'Something went wrong'});
    }
}


// to update final transaction status
const updatetransactionStatus = async (req, res) =>{
    try {
        const {order_id, payment_id, status} = req.body;


        if(!order_id){
            throw new Error({"Error" : "order Id is required"});
        }

        const order = await Order.update(
            {
                paymentid : payment_id,
                status : status
            },
            {
                where : {
                    orderid : order_id
                }
            }
        );
        
        
        req.user.ispremiumuser = true;
        await req.user.save();

      const payload = {
        id : req.user.id,
        ispremiumuser : true,
        name : req.user.name
      }
  
      const token = jwt.sign(payload, process.env.AUTH_SECRET_KEY); 
        
        return res.status(200).json({'success' : true, token : token});     
   } catch (error) {
        return res.status(500).json({"Error" : 'Payment failed'});
   }
    
}



// to send premium token to frontend
const getPremiumToken = (req, res, next) =>{
    try {
        if(req.user.ispremiumuser){
            const premiumtoken = jwt.sign('PremiumUser', process.env.AUTH_SECRET_KEY);
            return res.status(200).json({'premiumtoken' : premiumtoken});
        }else{
            throw new Error("You are not premium user");
        }
    } catch (error) {
        return res.status(401).json({'Error' : 'You are not premium user'});
    }
}



module.exports = {
    purchasePremium,
    updatetransactionStatus,
    getPremiumToken
};