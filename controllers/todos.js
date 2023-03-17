const todosModel=require('../models/todos')


function createTodo(todo){
  return todosModel.create(todo)
}


function getAllTodos(){
   return todosModel.find().populate("userId")
}


function getTodoById(id){
   return todosModel.findById(id).populate("userId")
}

function updateTodoById(id,obj){
   return todosModel.findByIdAndUpdate(id,obj,{new:true})


}
function deletTodo(id){
   return todomodel.findByIdAndDelete(id);
   }

module.exports={createTodo,getAllTodos,getTodoById,updateTodoById,deletTodo}