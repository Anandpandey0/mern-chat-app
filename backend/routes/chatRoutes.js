const express = require('express');
const { protect } = require("../middleware/authMiddleware");
const { accessAllChats , fetchAllChats,createGroups, renameGroup,removeGroup,addnewgroupmember} = require('../controllers/chatControllers');
const router = express.Router();




router.route("/").post(protect,accessAllChats).get(protect,fetchAllChats);

router.route("/group").post(protect,createGroups);
router.route("/renamegroup").put(protect,renameGroup);
router.route("/removegroup").put(protect,removeGroup);
router.route("/addnewgroupmember").put(protect,addnewgroupmember);
module.exports = router;