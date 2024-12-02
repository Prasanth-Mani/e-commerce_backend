import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 // Adjust unit amount calculation as needed
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount: 20 * 100 
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            success_url: `https://e-commerce-frontend-bay-three.vercel.app/verify?success=true&orderId=${newOrder._id}`,
            mode: "payment",
            cancel_url: `https://e-commerce-frontend-bay-three.vercel.app/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }
};



const verifyOrder = async (req, res) => {
    const {  success , orderId } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not paid" });
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        res.status(500).json({success: false, message: "Error verifying order" });
    }
};

//userOrders for frontend
const userOrders =async(req,res)=>{


         try {
            const orders=await orderModel.find({userId:req.body.userId})
            res.json({success:true,data:orders})
         } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
            
         }




}



//listing orders for admin

const listOrders=async(req,res)=>{


try {
    
    const orders=await orderModel.find({});
    res.json({success:true,data:orders})
} catch (error) {
    console.log(error);
            res.json({success:false,message:"Error"})
    
}



}



//order status

const updateStatus=async(req,res)=>{

try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})

   res.json({success:true,message:"status Updated"})


} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}



}











export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus};
 