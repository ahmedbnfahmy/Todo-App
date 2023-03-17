const express = require("express");
var router = express.Router();
const { createUser,getAllUsers,updateUser,deleteUser,login} = require("../controllers/users")
/////////////////////////////////////////////////////////////////////////////////create/////////////////////
router.post("/", async function (req, res) {
  var user = req.body;
  try {
    var newUser = await createUser(user);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});


/////////////////////////get////////////////////////////////////////////////////////////////
router.get("/", async (req, res, next) => {
  try {
    let users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.json({ Message: err.message });
  }
});


router.post("/login",login
// ,function(req,res){
//     var{email,password}=req.body
//     login(email,password)
// }
)




router.patch("/:id",async(req,res)=>{      //update 
  try{
     var{id}=req.params
     var user=req.body
    var updateduser= await updateUser(id,user) 
     res.json(updateduser)
   }catch(err){
   res.json({message:err.message})
   }
  })
     

router.delete("/:id",async(req,res)=>{   //delete
   try{
   var{id}=req.params
   var todo=req.body
   var deleted=await deleteUser(id,todo) 
   res.json(deleted)
   } catch(err){
    res.json({message:err.message});
   } 
 })





module.exports = router;
