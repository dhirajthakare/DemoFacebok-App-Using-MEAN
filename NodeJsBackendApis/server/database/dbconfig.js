
const mongoose = require('mongoose');

mongoose.connect(process.env.MongoDbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("connection successfully ");
}).catch((err)=>{
    console.log("connection Failed "+err);
})

module.exports=mongoose;