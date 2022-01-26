var express = require('express')
const { protect } = require('../middleware/authMiddleware');
var {
  //   getBloodRequest,
    postBloodStore
  //   putBloodRequest,
  //   deleteBloodRequest,
  } = require('../modules/bloodStore')
var {
  getBloodStore,
 
} =require('../modules/bloodStore.js')

// import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()
router.get("/",getBloodStore);
router.post("/",protect, postBloodStore);
module.exports = router;