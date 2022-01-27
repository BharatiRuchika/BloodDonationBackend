const asyncHandler = require('express-async-handler')
const User = require('../Models/User.js');
const { generateToken } = require('../utils/generateToken.js')

const LogonSession = require('../Models/userLogonSessionModel');
const logSession = async (id) => {
  const user = id
  const date = Date.now()
  const logDate = new Date(date)

  return await LogonSession.create({
    user,
    logDate,
  })
}

exports.logHistory = asyncHandler(async (req, res) => {
  const log = await LogonSession.find({})
    .sort({ logDate: -1 })
    .populate('user', ['name', 'email'])
  res.json(log)
})


exports.authUser = async (req, res) => {
  console.log("im in auth user");
    const email = req.body.email.toLowerCase()
    const password = req.body.password
  console.log("email",email);
  console.log("password",password);
    const user = await User.findOne({ email })
    console.log("user",user);
    if (user) {
     logSession(user._id)
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.role,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  }
  
  exports.getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.role,
      })
    } else {
      res.status(404)
      throw new Error('Invalid email or password')
    }
  })
  
  exports.updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email.toLowerCase() || user.email
      if (req.body.password) {
        user.password = req.body.password
      }
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.role,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404)
      throw new Error('Invalid email or password')
    }
  })
  
  exports.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 })
  
    res.json(users)
  })
  
  exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (req.params.id == req.user._id) {
      res.status(400)
      throw new Error("You can't delete your own user in the admin area.")
    }
  
    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  
  exports.getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  
  exports.updateUser = asyncHandler(async (req, res) => {
    console.log("im in update user");
    console.log("id",req.params.id);
    console.log("body",req.body);
    const user = await User.findById(req.params.id)
  
    if (req.params.id == req.user._id) {
      res.status(400)
      throw new Error("You can't edit your own user in the admin area.")
    }
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email.toLowerCase() || user.email
      user.role = req.body.isAdmin
      if (req.body.password) {
        user.password = req.body.password
      }
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.role,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })


  exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
      res.status(400)
      throw new Error('User already exist')
    }
  
    const user = await User.create({
      name,
      email,
      password
      
    })
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.role,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })