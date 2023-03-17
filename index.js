const express=require("express");
const mongoose = require('mongoose');
const todosRoutes=require("./routes/todos")
const usersRoutes=require("./routes/users")
const cors =require("cors")
const app=express()

mongoose.connect("mongodb://127.0.0.1:27017/ITPMearn")



app.use (cors())
app.use(express.json())
app.use("/todos",todosRoutes)
app.use("/users",usersRoutes)










app.listen(3333,()=>{
    console.log("listen3333");
})