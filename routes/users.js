var express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
var router = express.Router();
const user = require("../modules/users");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post("/login",user.authUser);
router.post('/',user.registerUser);
router.get('/log',user.logHistory)
router.get("/profile",protect, user.getUserProfile)
router.put("/profile",protect, user.updateUserProfile)
router.delete('/:id',protect,admin,user.deleteUser);
router.get('/:id',protect,admin,user.getUserById);
router.put("/:id",protect, admin, user.updateUser)
router.get('/',user.getUsers)
module.exports = router;
