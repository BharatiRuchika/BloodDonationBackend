var express = require('express');
const {
getBloodRequest,
  postBloodRequest,
   putBloodRequest,
  deleteBloodRequest,
} = require('../modules/bloodRequest')

const { protect } = require('../middleware/authMiddleware');

const router = express.Router()
router.put('/:id',protect, putBloodRequest)
router.post("/",protect,postBloodRequest);
router.delete("/:id",protect, deleteBloodRequest)
router.get("/",getBloodRequest);
module.exports = router;
// export default router