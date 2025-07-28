require('dotenv').config();

const { Wallet } = require("lucide-react");
const bcrypt = require('bcryptjs');
const {validator}=require('validator');
const mongoose=require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
    connectTimeoutMS: 30000, // 30 seconds
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((e) => {
    console.log(e);
  });
  

const BingoBordSchema = new mongoose.Schema({
   
    username:{
        type:String,
       required:true,
       unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"client",
    },    
   Wallet:{
        type:Number,
        default:1500,

    },
    gameHistory: [{
       
        gameId: { type: Number,default:0 },
        profit:{type:Number,default:0},
        numberofplayer:{type:Number,default:0},
        PayeForVendor: { type: Number },
        totalcash:{type:Number},
        PayForPlayer:{type:Number},
        awardforagen:{type:Number},
        percent:{type:Number,default:0.2},
        winerAward:{type:Number,default:0},
        stake: { type: Number,default:0 },
        timestamp: { type: Date,   } 
    }],
});

const BingoBord =mongoose.models.BingoBord || mongoose.model('BingoBord',  BingoBordSchema);

module.exports = BingoBord;
