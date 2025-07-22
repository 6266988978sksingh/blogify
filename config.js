const mongoose = require("mongoose")
 

const connectdb=async (url)=>{
    await  mongoose.connect(url)
    .then(()=> console.log("db connected"))
    .catch((err)=> console.log(err))
}

module.exports= {connectdb}