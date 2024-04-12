const mongoose = require('mongoose');
const Channel = require('./channelmodel')

const messageSchema=new mongoose.Schema({
   
    content:{
        type:String,
        require:true
    },
    channel:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Channel'
    },
    timestamp: {
        type: Date,
        default: Date.now
      }
  
})

module.exports=mongoose.model('Message',messageSchema)


