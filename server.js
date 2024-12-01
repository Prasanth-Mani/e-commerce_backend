import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRouter.js";



const app = express();
const port = 4000;
app.use(cors());

app.use(express.json());

connectDatabase();

 app.use("/api/products",foodRouter)
 app.use("/images",express.static('uploads'))
 app.use("/api/user",userRouter)
 app.use("/api/cart",cartRouter)
 app.use("/api/order",orderRouter);




app.get("/", (req, res) => {
    res.send("Api Working");
});

app.listen(port, () => {
    console.log(`server start from port no ${port}`);
});
