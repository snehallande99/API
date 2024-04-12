const mongoose = require('mongoose');
const Message = require('./messagemodel')
const channelSchema = new mongoose.Schema({
    name:{
        type:String,
       require:true
     },
    Messages: [Message]
  });

module.exports=mongoose.model('Channel',channelSchema)

