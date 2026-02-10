    // const express = require('express');
    // const app= express();
    // app.use((req,res,next)=>{
    //     console.log(" request url: ",req.url);
    //     console.log(" request method: ",req.method);
    //     next();
    // });
    // app.get('/home',(req,res)=>{
    //     res.send("welcome Home");
    // });
    // // route level middleware
    // const checkLogin=(req,res,next)=>{
    //     const isLoggedIn=true;
    //     if(isLoggedIn){
    //         next();
    //     }else{
    //         res.status(401).json({message: "pleae login to access this page"});
    //     }   
    // };
    // app.get('/dashboard',checkLogin,(req,res)=>{
    //     res.send("welcome to dashboard");
    // });

    // //Application level middleware
    // const authMiddleware=(req,res,next)=>{
    //     const token=req.headers.authorization;  
    //     if(!token){
    //         return res.status(403).json({message: "Unauthorized access"}); 
    //     }
    //     next();     

    // };
    // app.get('/profile',authMiddleware,(req,res)=>{
    //     res.send("welcome to profile page");    
    // });
    // //Error handling middleware
    // app.get("/error",(req,res)=>{
    //     throw new Error("Something went wrong");
    // });
    // app.use((err,req,res,next)=>{
    //     console.error(err.stack);
    //     res.status(500).json({message: "Internal Server Error"});
    // });

    // app.listen(8000,()=>{
    //     console.log("Server is running on port 8000");
    // }   );


const express = require('express');
const cors= require('cors');
const app = express();  
app.use(express.json());
app.use(cors());
app.get('/data',(req,res)=>{
    res.json({message: "cors working!"});
});
app.listen(8000,()=>{
    console.log("Server is running on port 8000");
});

//fronteend allowing
app.use(cors({
    origin: 'http://localhost:5173'
}));
const allowOrigin=[
    'http://localhost:5173',
    'http://localhost:3001',
];
app.use(cors({origin:allowOrigin}));
app.listen(8000,()=>{
    console.log("Server is running on port 8000");
});