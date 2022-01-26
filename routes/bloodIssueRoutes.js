var express = require('express');
const {
  getBloodIssue,
  postBloodIssue
//   deleteBloodIssue,
} = require('../modules/bloodIssue')

const { protect } = require('../middleware/authMiddleware');

const router = express.Router()

router.post("/",protect, postBloodIssue);
router.get("/",getBloodIssue);
// router.delete('/:id',protect, deleteBloodIssue);
module.exports = router;
// export default router