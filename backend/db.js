const mongoose=require('mongoose');

const mongoossURL="mongodb://localhost:27017/loginform";

const connect_to_mongoDB=async()=>{
    try{

        await mongoose.connect(mongoossURL,{useNewUrlParser: true, useUnifiedTopology: true})
        console.log("Connected to MongoDB successfully!");

    }catch(error){
        console.error("Error connecting to MongoDB:", error);

    }
}

module.exports=connect_to_mongoDB;