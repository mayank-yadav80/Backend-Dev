const express = require('express');
const app= express();
app.use((req,res,next)=>{
    console.log(" First Middleware executed");
    next();
});
app.use((req,res,next)=>{
    console.log("Second Middleware executed");
    next();
});
app.get('/test',(req,res)=>{
    res.send("Test route successfully accessed");
});
app.listen(8000,()=>{
    console.log("Server is running on port 8000");
});