const mongoose = require("mongoose");

const connectToDB = async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log("COnnected to MONGODB"); 
    } catch (err) {
        console.log("MongoDB connection error", err.message);

    }
}

module.exports=connectToDB;