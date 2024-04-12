const express=require('express');
require('./db')
const Message = require('./Models/messagemodel')
const Channel = require('./Models/channelmodel')
const app=express();
app.use(express.json());

//*********** Routes ***************** */
const authRoute=(require('./routes/authRoutes'))
app.use("/auth",authRoute)



app.get('/get-messages/:channel_id',async(req,res)=>{
    console.log(req.params.channel_id)
    const data=await Channel.findById(req.params.channel_id)
    // const data=Channel.findOne({ name: "channel2" }, { Messages: 1, _id: 0 })
    res.json(data.Messages);
})
app.get('/getall-messages',async(req,res)=>{
    const data=await Message.find()
    res.json(data);
})
app.get('/get-channels',async(req,res)=>{
    const data=await Channel.find();
    // res.send(data[0]._id);
    res.send(data);
})

app.post('/create-channel',async(req,res)=>{
    try {
        const {name}= req.body;
      
        var channeldata=new Channel({name})
        await channeldata.save();
        res.status(201).send({success:true,message:"Channel added successfully"})
       } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in channel',
            error
        })
       }
})
app.post('/send-message/:channel_id',async(req,res)=>{
    try {
        console.log(req.params.channel_id)
        // const channel=await Channel.findOne({name:req.params.channel_name})
        const channel=await Channel.findById(req.params.channel_id)
        const {content}= req.body;
        var messagedata=new Message({content:content,channel:req.params.channel_id})
        await messagedata.save();
        channel.Messages.push(messagedata);
        await channel.save();
        res.status(201).send({success:true,message:"Message added successfully"})
       } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in message',
            error
        })
       }
})
app.get('/getall-messages',async(req,res)=>{
    try {
        apidata= Message.find({})
        const data=await apidata
        res.send(data)
       } catch (error) {
        console.log(error)
       }
})

// app.post('/send-message',async(req,res)=>{
//     try {
//         const {content}= req.body;
//         var messagedata=new Message({content})
//         await messagedata.save();
//         res.status(201).send({success:true,message:"Message added successfully"})
//        } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:'Error in message post',
//             error
//         })
//        }
// })

app.listen(3000||PORT,()=>{
    console.log("listening on 3000 port")
})