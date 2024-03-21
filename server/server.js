const express= require("express") ;
const axios = require("axios");

const connectDB = require("./config/db");

const productRoute = require("./Routes/productRoute");
const { notFound, errorHandler } = require("./Middleware/Errors");
const  userRouter  = require("./Routes/userRoute");
const orderRouter = require("./Routes/orderRoute");



const app = express();
app.use(express.json());

//connect database
async function startServer(){
    try{
        await connectDB();

    } catch(error){
        console.error("Error connecting to the database:", error);
    }
};

startServer();

//api
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
  });

const PORT = process.env.PORT || 5000;


// error handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
 });