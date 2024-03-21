const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { User } = require("./models/userModel");
const { Product } = require("./models/productModel");
const { users } = require("./data/user");
const { products } = require("./data/Products");


dotenv.config();

async function startServer(){
    try{
        await connectDB();

    } catch(error){
        console.error("Error connecting to the database:", error);
    }
};

startServer();



const importData = async () =>{
    try{
        await User.deleteMany();
        await Product.deleteMany();

        const createUsers =  await User.insertMany(users);

        const userAdmin = createUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return{...product, user: userAdmin};
        });

        await Product.insertMany(sampleProducts);
        console.log("Data imported");
    } catch(error){
        console.log(error.message);
    }
}




const destroyData = async () => {
    try {
      await User.deleteMany();
      await Product.deleteMany();
  
      console.log("Data Destroyed");
    } catch (error) {
      console.log(error.message);
    }
  };
  
  if (process.argv[2] == "-d") {
    destroyData();
  } else {
    importData();
  }


module.exports = importData;

