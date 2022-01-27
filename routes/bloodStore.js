var express = require('express')
const { protect } = require('../middleware/authMiddleware');
var {
  getBloodStore,
  putBloodStore,
  deleteBloodStore,
  postBloodStore
} = require('../modules/bloodStore')
var {
  getBloodStore,
 
} =require('../modules/bloodStore.js')

// import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()
router.get("/",getBloodStore);
router.post("/",protect, postBloodStore);
router.put('/:id',protect, putBloodStore)
router.delete('/:id',protect, deleteBloodStore)
module.exports = router;