const axios = require('axios');
const port = process.env.PORT || 3000;

exports.homeroute = (req,res)=>{
     res.send("hello bro");
}