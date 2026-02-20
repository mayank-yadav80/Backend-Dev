const express=require("express");
const fs=require("fs");
const users=require("./MOCK_DATA.json");
const app=express();
app.use(express.urlencoded({ extended: false }));

app.get("/api/users",(req,res)=>{
    // respond with JSON array of all users (same as /users)
    res.json(users);
});
app.post('/api/users',(req,res)=>{
    const {first_name,last_name,email,gender,job_title}=req.body;
    const newUser={
        id:users.length+1,
        first_name,
        last_name,
        email,
        gender,
        job_title
    }
    users.push(newUser);
    fs.writeFile("MOCK_DATA.json",JSON.stringify(users,null,2),(err)=>{
        if(err){
            res.status(500).json({message:"Error saving user data"});
        } else {
            res.status(201).json({message:"User created successfully",user:newUser});
        }
    });
});

app.patch("/api/users/:id",(req,res)=>{
    const id=req.params.id;
    const userIndex=users.findIndex((u)=>u.id==id);
    if(userIndex ==-1){
        return res.status(404).json({message:"User not found"});
    }
    users[userIndex]={
        ...users[userIndex],
        ...req.body};
        fs.writeFile("MOCK_DATA.json",JSON.stringify(users,null,2),(err)=>{
            if(err){
                res.status(500).json({message:"Error updating user data"});
            } else {
                res.json({message:"User updated successfully",user:users[userIndex]});
            }
        });
});

app.delete("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const userIndex=users.findIndex((u)=>u.id==id);
    if(userIndex==-1){
        return res.status(404).json({message:"User not found"});
    }
    const deletedUser=users.splice(userIndex,1)[0];     
    fs.writeFile("MOCK_DATA.json",JSON.stringify(users,null,2),(err)=>{
        if(err){
            res.status(500).json({message:"Error deleting user data"});
        } else {
            res.json({message:"User deleted successfully",user:deletedUser});
        }
    });
});
app.listen(8000,()=>{
    console.log("Server is running on port 8000");
});