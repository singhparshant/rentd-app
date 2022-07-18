const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


const list = async (req, res) => {
  try {
    let user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

const create = async (req, res) => {
  try {
    let user = new User(req.body);
    //hash password before storing it in the db
    const passwordPlainText = req.body.password
    const passwordHash = await bcrypt.hash(passwordPlainText, 10);
    user.passwordHash = passwordHash;
    user = await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

const login = async (req, res) => {
  const email = req.body.email;
  const passwordPlainText = req.body.password;

  const user = await User.findOne({ "email": email });
  if (!user)
    res.status(404).send("Please verify your email address!")
  else {
    //user exists -> verify password
    const isValid = await bcrypt.compare(passwordPlainText, user.passwordHash);
    if (isValid) {
      //generate token
      const payload = { id: user._id, role: user.role }
      const jwtToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
      const response = { username: user.username, role: user.role, id: user.id };
      res.cookie("jwt", jwtToken, { httpOnly: true });
      res.status(200).json(response);
    }
    else
      res.status(401).send("Please verify your password!")
  }
}

const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send("Successfully logged out!");
}

const read = async (req, res) => { 
  let response = await User.findById(req.params.id);
  //console.log("response: ")
  if(!response){
    return res.status(404).json({
      message: "User not found with id " + req.params.id
    });
  }
  return res.status(200).json(response) 
};


const update = async (req, res) => { 
  console.log("SOMETHING")
  let user = await User.findById(req.params.id);
  console.log("user is: ", user)
  if (req.body.oldPassword != "") {
    //there is old password given
    console.log("maluma")
    try {
      //const passwordHash = user.passwordHash;
      //console.log("user")
      console.log("alejandro sanz has old password:", req.body.oldPassword)
      //const passwordHashOldUpdate = await bcrypt.hash(req.body.oldPassword, 10);
      //console.log("new hash: ", passwordHashOldUpdate)
      
      console.log("about to compare")
      const isValid = await bcrypt.compare(req.body.oldPassword, user.passwordHash);
      console.log("is valid is: ", isValid)
      
      
      console.log("j balvin is valid: ", isValid)
      if (isValid){
        console.log("password match rrrr")
        console.log("new password is: ", req.body.newPassword)
        const passwordHashNew = await bcrypt.hash(req.body.newPassword, 10);
        console.log("passwordhashnew is: ", passwordHashNew)
        const responseUpdate = await User.findByIdAndUpdate(
          req.params.id,
          {
            username: req.body.username,
            password: passwordHashNew,
            email: req.body.email,
            role: req.body.role,
            address: req.body.address,
          }
          );

          return res.status(200).json({
            responseUpdate
          })
        console.log("the response update is: ", responseUpdate)
      }
      else{
        return res.status(404).send({
          message: "Wrong password, error message is: " + error.message
        })
      }
    } catch (error) {
      console.log("error message is: ", error.message)
      return res.status(404).send({
        message: "Some error related to password"
      });
    }
    
  }
  else{
    const responseUpdate = await User.findByIdAndUpdate(
        req.params.id,
        {
          username: req.body.username,
          password: user.passwordHash,
          email: req.body.email,
          role: req.body.role,
          address: req.body.address,
        }
        );

  }
  
  
  
  

}

const remove = async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "User not found with id " + req.params.id
        });
      }
      res.status(200).json({
        success: true,
        data: data,
        message: "User successfully deleted!"
      });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          success: false,
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        success: false,
        message: "Could not delete User with id " + req.params.id
      });
    });
}

module.exports = { list, create, read, update, remove, login, logout };