const express=require('express');
const users=require("./MOCK_DATA.json");
const app=express();
app.use(express.urlencoded({ extended: true }));

app.get("/user",(req,res)=>{
    const html=`
<ul>${users.map((user)=>`<li>${user.first_name} ${user.last_name}</li>`).join("")}</ul>
    `;
    res.send(html);
});
//REST API
// app.get("/users",(req,res)=>{
//     res.json(users);
// });
app.get("/api/users",(req,res)=>{
    // respond with JSON array of all users (same as /users)
    res.json(users);
});
app.get((req,res)=>{
    const id=req.params.id;
    const user=users.find((u)=>u.id==id);
    return res.json(user);
});
app.post("/api/users",(req,res)=>{
    const newUser=req.body;
    newUser.id=users.length+1;
    users.push(newUser);
    fs.writeFileSync("MOCK_DATA.json",JSON.stringify(users,null,2));
    
    res.json({message:"User created successfully"});
});
app.patch("/api/users/:id",(req,res)=>{
    const id=req.params.id;
    return  res.json({message:`User with id ${id} updated successfully`});
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
} );