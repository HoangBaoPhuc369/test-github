const {
  createSecretPassword,
  addVideoForChildren,
  removeVideoForChildren,
  updateSecretPassword,
} = require("../controllers/user");

const router = require("express").Router();

// router.patch("/user/update-secret-password", updateSecretPassword);

router.patch("/user/update-secret-password", updateSecretPassword);



module.exports = router;
