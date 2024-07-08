const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const verifyToken = require("../middleware/authMiddleWare");
const upload = require("../middleware/multerMiddleWare");

router.get("/get-profile", verifyToken, userControllers.handleGetProfile);
router.put("/edit-profile", verifyToken, userControllers.handleUpdateProfile);
router.put(
  "/update-password",
  verifyToken,
  userControllers.handleUpdatePassword
);
router.put("/update-phone", verifyToken, userControllers.handleUpdatePhone);
router.post(
  "/upload-avatar/",
  verifyToken,
  upload.single("avatar"),
  userControllers.uploadAvatar
);
router.delete("/delete-avatar/", verifyToken, userControllers.deleteAvatar);
module.exports = router;
