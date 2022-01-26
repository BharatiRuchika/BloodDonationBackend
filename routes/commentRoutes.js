var express = require('express');
const {
  deleteComment,
  getComment,
  postComment,
  putComment,
} = require('../modules/comment');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router()

router.get("/",protect, getComment);
router.post("/",protect,postComment);
router.put('/:id',protect, putComment);
router.delete("/:id",protect,deleteComment);

module.exports = router;