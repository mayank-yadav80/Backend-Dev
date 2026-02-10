const express = require('express');
const app= express();
 let students=[
    {id:1,name:"sara",marks:"76",age:20},
    {id:2,name:"skand",marks:"85",age:22},
    {id:3,name:"shiva",marks:"65",age:21},
    {id:4,name:"yash",marks:"60",age:19},
    {id:5,name:"mayank",marks:"70",age:23}
];
app.get('/students',(req,res)=>{
    res.json(students);
});
app.delete('/students/:id',(req,res)=>{
    const id = req.params.id;
    const marks=students.find(student => student.id === parseInt(id)).marks;
    if(marks>70){
        return res.status(400).json({message: "Student cannot be deleted as marks are less than 70"});
    }
    const idx = students.findIndex(s => s.id === parseInt(id));
if (idx !== -1) {
  students.splice(idx, 1);
}
    res.json({message: "Student deleted successfully"});
});
app.listen(8000,()=>{
    console.log("Server is running on port 8000");
});