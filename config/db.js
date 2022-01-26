// import mongoose from 'mongoose'

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     })
//     console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
//   } catch (error) {
//     console.error(`Error: ${error}`.red.underline.bold)

//     // Exit process with failure
//     process.exit(1)
//   }
// }

// require('dotenv').config({ path: './config/config.env' })
const mongoose = require("mongoose");
exports.connect = async()=>{
    try{
        console.log(
            "uri",process.env.DB_LOCAL_URI
        )
        console.log("in port",process.env.PORT)
    var con = await mongoose.connect(`${process.env.DB_LOCAL_URI}`,{useNewUrlParser:true,useUnifiedTopology:true})
    console.log("database connected");
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    }catch(err){
        console.log(err);
    }
}


// export default connectDB
