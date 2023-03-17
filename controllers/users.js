const userModel = require("../models/users");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

function createUser(user) {
  return userModel.create(user);
}
function getAllUsers() {
  return userModel.find();
}



function updateUser(id, todo) {
  return userModel.findByIdAndUpdate(id, todo);
}

function deleteUser(id, todo) {
  return userModel.findByIdAndDelete(id, todo);
}









async function login(req, res) {
  var { email, password } = req.body;
  var user = await userModel.findOne({ email });

  if (user) {
    ///بيقارن////////////bcrypt
    console.log(user);
    var valid = bcrypt.compareSync(password, user.password);

    if (valid) {
      ///generate token
      var token = jwt.sign(
        {
          userId: user._id,
          userName: user.name,
        },
        process.env.SECRET,
        { expiresIn: "10h" }
      );

      res.status(200).json(token);
    } else {
      res.status(401).json({ message: "enter correct data" });
    }
  } else {
    ////un authrized
    ///مش هيبعت حاجه فى الريسبونس
    res.status(401).end();
  }
}

module.exports = { createUser, getAllUsers, updateUser, deleteUser, login };
