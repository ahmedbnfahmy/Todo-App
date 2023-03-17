const express =require("express")
var router =express.Router()
const { createTodo ,getAllTodos,getTodoById,updateTodoById,deletTodo} = require('../controllers/todos')
const { auth } = require("../middilewares/auth")




router.use(auth)
//save new todo
router.post("/", (req, res, next) => {
    var todo = req.body
    todo.userId=req.userId
    createTodo(todo).then((data) => {
        res.status(201).json(data)
    }).catch((err) => {
        res.status(422).json({ message: err.message })
    })

})


//get all todos
router.get("/",async(req,res)=>{
    try{
        var todos= await getAllTodos()
        console.log(todos.length)
        res.status(200).json(todos)
    }catch(err){
     res.status(400).json({ message: err.message })
    }
  
})



//get by id
router.get("/:id",async(req,res)=>{
    var {id}=req.params
    try{
       var todo=  await getTodoById(id)
       res.status(200).json(todo)
    }catch(err){
       res.status(400).json({ message: err.message })
    }

})


//update by id
//title , status
router.patch("/:id",(req,res)=>{
    var {id}=req.params
    var obj=req.body
    updateTodoById(id,obj).then((data)=>{
        res.status(200).json(data)
    }).catch(err=>{
        res.status(422).json({ message: err.message })
    })

})

router.delete("/:id",async(req,res)=>{   //done
    try{
       var{id}=req.params
      
     var deleted=await deletTodo(id)
     res.json(deleted)
     } catch(err){
      res.json({message:err.message});
     } 
   })













module.exports=router