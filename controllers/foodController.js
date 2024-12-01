import productModel from './../models/foodModel.js'
import fs from 'fs';




//add food item

const addProduct = async (req, res) => {
  const image_filename = req.file.filename;

  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    brand: req.body.brand,
    stock: req.body.stock,
    tags: req.body.tags ? req.body.tags.split(",") : [], // Split tags into an array if provided
    image: image_filename,
  });

  try {
    await product.save();
    res.json({ success: true, message: "Product Added Successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error Adding Product" });
  }
};

//all Food list

const listFood=async(req,res)=>{
try {
    const foods= await productModel.find({}) 
    res.send({success:true,data:foods})
} catch (error) {
    console.log(error)
    res.send({success:false,message:error})
}
   
    
}

const removeFood=async (req,res)=>{

    

   try {
    const food= await productModel.findById(req.body.id);
   
     fs.unlink(`uploads/${food.image}`,()=>{}) 
    await productModel.findByIdAndDelete(req.body.id);
      
     res.json({success:true,message:"food  removed"})

   } catch (error) {
    res.json({
        success:false,message:"error"
    })
   }  

}

export {addProduct,listFood,removeFood}