import express from "express";
import multer from "multer";
import { addProduct, listFood, removeFood } from "../controllers/foodController.js";



const foodRouter=express.Router();


const storage=multer.diskStorage({
destination:"uploads",
filename:(req,file,cb)=>{

return cb(null,`${Date.now()}${file.originalname}`)


}

})

const upload=multer({storage:storage})


foodRouter.post("/add",upload.single("image"),addProduct)

foodRouter.get("/list",listFood )
foodRouter.post("/remove",removeFood)


export default foodRouter;