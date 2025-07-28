require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
console.log('ENV Path:', require('path').resolve(__dirname, '.env'));
console.log('All ENV:', process.env);
const express = require("express")
const async = require('async');

const BingoBord=require("../Models/BingoBord")
const jwt=require('jsonwebtoken')
const cors = require("cors")
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const alluserRoutes = require('../routes/alluserRoutes');
const authRoutessignup= require('../routes/signupauthRoutes');
const gameHistoryRoutes = require('../routes/gameHistory');
const depositRoutes = require('../routes/depositRoutes');
const adminRoutes = require("../routes/adminRoutes");
const reportRoutes = require('../routes/reportRoutes');
const path = require('path');
const secretkey=process.env.JWT_SECRET;
const refreshKey=process.env.JwT_PRIVATE;


const bodyParser=require("body-parser")


//const workoutrouter=require("./src/Routes/Users");

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use("/manifest.json", express.static("public/manifest.json"));
const http=require("http");


const server=http.createServer(app);
//to be exported  


app.use(bodyParser.json());


const allowedOrigins = [
  'http://localhost:3000',

  //          // Development URL
  'https://localhost:3000',        // Development URL with HTTPS
  'http://167.235.140.218',        // IP address (if needed)
  'http://adeyebingo.com',         // Production domain with HTTP
  'https://adeyebingo.com',        // Production domain with HTTPS
  'http://www.adeyebingo.com',     // www version with HTTP
  'https://www.adeyebingo.com',//      // www version with HTTPS

  'http://167.235.140.218',
  'http://adeyebingo.com',
  'https://adeyebingo.com',
  'http://www.adeyebingo.com',
  'https://www.adeyebingo.com',

  'https://api.adeyebingo.com',
  

];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


console.log("json update");
console.log('Loaded JWT_PRIVATE:', process.env.JWT_PRIVATE);
console.log('Full ENV:', process.env);
console.log("enviroment updated");
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no 'origin' (e.g., mobile apps, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow this origin
    } else {
      callback(new Error('CORS not allowed')); // Block others
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies to be sent
}));

// Enable handling of OPTIONS requests (for preflight)
app.options('*', cors()); // Automatically handle OPTIONS requests

/* const createToken=(_id)=>{
 return   jwt.sign({_id}, process.env.JWT_SECRET,{expiresIn:'3d'})
} */


 
 
 app.get('/', (req, res) => {
  res.json({ message: 'Hello, world! ass i know ' }); // Sends a JSON response
});
/* app.use(cors({
  origin: [
    "http://localhost:3000", 
    "https://adeybingo-10.onrender.com/",
    "https://adeyebingo-1rcred9yr-girums-projects-c9befee2.vercel.app/"
  ],  // Allow both /logins and /signups routes
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
  credentials: true,  // Allow cookies to be sent
}));
 */
/* app.use(cors({
  origin: "https://adeybingo-1rcred9yr-girums-projects-c9befee2.vercel.app", // Your frontend Vercel URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // Allow cookies if needed
})); */
/* const allowedOrigins = [
  'http://localhost:3000', // Add your allowed frontend URLs here
  'http://127.0.0.1:3000',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no 'origin' (e.g., mobile apps, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow this origin
    } else {
      callback(new Error('CORS not allowed')); // Block others
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],    // Allowed headers
  credentials: true,                                    // Allow cookies to be sent
}));
 */






/* app.use(cors({
  origin: function(origin, callback) {
    // Allow any origin in development, but only specific origins in production
    const allowedOrigins = [
       // Add your frontend URL here4
     'http://127.0.0.1:3001',
    
    
    ];

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
  credentials: true,  // Allow cookies to be sent
}));

app.use(cors({
  origin: '*',  // Allow all origins
})); */


  const verfyuser = async (req, res, next) => {
    const accesstoken = req.cookies.accesstoken;
  
    if (!accesstoken) {
      // Renew the token
      const renewToken = (req, res, next) => {
        // Logic to renew the token if expired
        const newToken = jwt.sign({ username: req.username, role: req.role }, secretkey, { expiresIn: '1h' });
        res.cookie('accesstoken', newToken, { httpOnly: false });
        next(); // Proceed to next middleware
      };
      
      // Let renewToken handle the response or call next()
    } else {
      jwt.verify(accesstoken, secretkey, (err, decoded) => {
        if (err) {
          return res.json({ valid: false, message: "Invalid token" });
        } else {
          req.username = decoded.username;
          req.role=decoded.role;
          next(); // Proceed to the next middleware
        }
      });
    }
  };
  console.log ("code edited");
  console.log("second edit");
  app.get('/api', (req, res) => {
    res.send('API is working!');
  });
  app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/api', reportRoutes);
app.use('/auth', authRoutessignup);
app.use('/api', gameHistoryRoutes);
app.use('/api', depositRoutes);
app.use('/api', alluserRoutes);
app.use("/api/admin", adminRoutes);
app.post("/deleteuser",async(req,res)=>{
    const{username}=req.body
  
    
    try{
        //const check=await BingoBord.findOne({username:username})
  
      const existinguser=await BingoBord.findOne({username})
      console.log(username);
      if(!existinguser){
        return res.status(404).json({ success: false, message: "User not found" });
      }
      await BingoBord.deleteOne({ username });

      res.status(200).json({ success: true, message: "User successfully deleted" });
  
    }
    catch(e){
      console.error("Error during user deletion:", e);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  
  })
  app.post("/updatewallete", async (req, res) => { 
    const {tempuser,incaamount} = req.body;
  
    
    try {
        // Find if the player already exists
        const check = await BingoBord.findOne({ username: tempuser });
        console.log("user is ",check);
          
        if (check) {
         // Retrieve the last gameId from gameHistory if it exists, otherwise start from 0
             // Increment gameId
            
            const filter = { username:  tempuser };
            const update = {
                $inc: { Wallet: incaamount}// Deduct from Wallet
               
                
                } // Push new game history entry
           
  
            const result = await BingoBord.updateOne(filter, update);
            if (result.matchedCount === 0) {
                console.log("No documents matched the filter.");
            } else if (result.modifiedCount === 0) {
                console.log("Document was found, but no updates were made.");
            } else {
                console.log("Document updated successfully.");
            }
            return res.json("updated");
          }// Send response after successful update
        else {
            // If player does not exist, insert data and respond
            await BingoBord.insertMany([data]); // Ensure collection is defined correctly here
            return res.json("notexist");
        }
    } catch (e) {
        console.error("Database error:", e); // Log the error
        if (!res.headersSent) { // Ensure response is sent only once
            res.json("fail");
        }
    }
  });

 
const getUsernameFromToken = (req, res, next) => {
  const accessToken = req.headers.authorization && req.headers.authorization.split(' ')[1];
console.log(accessToken);
  if (!accessToken) {
    return res.status(401).json({ valid: false, message: 'Access token not provided' });
  }
  

  jwt.verify(accessToken, secretkey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ valid: false, message: 'Invalid access token' });
    }
    
    // Attach username to the request object
    req.username = decoded.username;
    req.role=decoded.role;
   
    next();
  });
};

app.post("/loginuseradminstre",async(req,res)=>{
  const{username,password}=req.body

  
  try{
      //const check=await BingoBord.findOne({username:username})

    const existinguser=await BingoBord.findOne({username})
    if(!existinguser){
        throw new Error("user not found");
    }
    const ispasswordvalid= await bcrypt.compare(password,existinguser.password);
    if(!ispasswordvalid){
        console.log("invalid password");
    }
    console.log(refreshKey);
    console.log(secretkey);
     
     const accesstoken = jwt.sign( { username: username }, secretkey, { expiresIn: "1d" } )// Access token expires in 1 day
     const refreshtoken = jwt.sign( { username: username },  refreshKey, { expiresIn: "30d" }  );
    
  
    res.cookie('accesstoken', accesstoken, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      httpOnly: false, // Secure from client-side JS
      secure: true, // Send over HTTPS only
      sameSite: 'strict' // CSRF protection
    })
   
    const role=existinguser.role;
   
    if(role==="admin"){
      res.json({Admin:true});
    }
    if(role=== "client"){
      res.json({Admin:false});
    }
  //  res.json("sucesseded"); 

  }
  catch(e){
    console.error("Error during user registration:", e);
      res.json("fail")
  }

})
app.post("/useracess",getUsernameFromToken,(req,res)=>{
  res.json({ valid: true, username: req.username ,role:req.role});
  console.log("hay",req.username,req.role);
})
app.post("/loginacess",getUsernameFromToken,(req,res)=>{
 
  res.json({ valid: true, username: req.username,role:req.role });
}
) 
app.post("/depositcheckB",async(req,res)=>{
  const{username}=req.body
  console.log(username);
  const data1 = await BingoBord.findOne({ username: username });
  
    let depo1=parseInt(`${data1.Wallet}`);
    console.log("user name is ",data1);

  try{
 
      if(data1){
          res.json(depo1)
          console.log("your balance is ",depo1);
      }
      else{
          res.json("notexist")
      }

  }
  catch(e){
    console.log(e);
      res.json("fail")
  }

})    
app.get("/dashboard", verfyuser, async (req, res) => {
  console.log("Dashboard route hit");
  try {
    const user = await BingoBord.find({});
    console.log("All users are:", user);
    return res.json({ valid: true, user: user });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ valid: false, message: "Error fetching users" });
  }
});
/* app.get("/dashboard",verfyuser,async(req,res)=>{
  //const{username,password}=req.body
     
     const user=await BingoBord.find({})
     console.log("all users are", user);
    return  res.json({valid:true ,user:user});
    
}) */
app.post("/updateplayer", async (req, res) => { 
  const { username,stake,numberofplayer,profit,awardforagent,totalcash,venderaward,winerAward,percent } = req.body;

  const data = {
      username: username,
      numberofplayer:numberofplayer,
      profit:profit,
      stake: stake,
      totalcash: totalcash,
      venderaward: venderaward,
      winerAward:winerAward,
      awardforagent:awardforagent,
      percent:percent
  };

  try {
      // Find if the player already exists
      const check = await BingoBord.findOne({ username: username });
     // console.log("user is ",check);
        console.log("winer awared is ",winerAward);
      if (check) {
       // Retrieve the last gameId from gameHistory if it exists, otherwise start from 0
let depo1 = (check.gameHistory.length > 0) 
? check.gameHistory[check.gameHistory.length - 1].gameId + 1 
: 1;
        console.log( check.gameId);
           depo1 =depo1+1;// Increment gameId
          const PayeForVendor = venderaward;
          
          const waletdeuction = -venderaward;
          const filter = { username:  username };
          const update = {
              $inc: { Wallet: waletdeuction }, // Deduct from Wallet
             
              $push: { 
                  gameHistory: { 
                      gameId: depo1,
                      stake: stake,
                      numberofplayer:numberofplayer,
                      profit:profit,
                      awardforagen:awardforagent, 
                      PayeForVendor: PayeForVendor, 
                      winerAward: winerAward,
                      totalcash: totalcash,
                      percent:percent,
                      timestamp: new Date()
                  } 
              } // Push new game history entry
          };

          const result = await BingoBord.updateOne(filter, update);
          if (result.matchedCount === 0) {
              console.log("No documents matched the filter.");
          } else if (result.modifiedCount === 0) {
              console.log("Document was found, but no updates were made.");
          } else {
              console.log("Document updated successfully.");
          }
          return res.json("updated"); // Send response after successful update
      } else {
          // If player does not exist, insert data and respond
          await BingoBord.insertMany([data]); // Ensure collection is defined correctly here
          return res.json("notexist");
      }
  } catch (e) {
      console.error("Database error:", e); // Log the error
      if (!res.headersSent) { // Ensure response is sent only once
          res.json("fail");
      }
  }
});


app.post("/login", async(req,res)=>{
  const {username,password}=req.body
  res.json({mssg:'login user'})
  
  try{
    const user=await BingoBord.login(username,password)
    const token= createToken(user._id)
    res.status(200).json({username,token})

}
catch(error){
    res.status(400).json({error:error.message})
}
})

app.post("/gameid",async(req,res)=>{
 
  const lastGame = await GameIdCounter.findOne().sort({ gameId: -1 }); // Sort by gameId in descending order

  if (lastGame) {
      return lastGame.gameId; // Return the gameId of the last game
  } else {
      throw new Error("No games found.");
  }

})
const port=process.env.PORT;
server.listen(port||3001,'0.0.0.0',()=>{
    console.log(`port connected port  ${port}`);
})
