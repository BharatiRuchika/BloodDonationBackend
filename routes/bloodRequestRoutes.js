var express = require('express');
const {
getBloodRequest,
  postBloodRequest,
//   putBloodRequest,
//   deleteBloodRequest,
} = require('../modules/bloodRequest')

const { protect } = require('../middleware/authMiddleware');

const router = express.Router()

router.post("/",protect,postBloodRequest);

router.get("/",getBloodRequest);
module.exports = router;
// export default router