const {
  createChildren,
  updateSecretPasswordChildren,
  addVideoHistory,
  clearVideosHistory,
  deleteSecretPasswordChildren,
  updateChildrenForChildren,
  updateChildrenForParent,
  deleteChildren,
  listChildrens,
  updateContentSettingChildren,
  getChildren,
  addVideoForChildren,
  removeVideoForChildren,
} = require("../controllers/children");

const router = require("express").Router();

router.post("/children/create-children", createChildren);
router.patch(
  "/children/modify-secret-password-children",
  updateSecretPasswordChildren
);
router.patch(
  "/children/delete-secret-password-children",
  deleteSecretPasswordChildren
);

router.patch(
  "/children/update-content-setting-children",
  updateContentSettingChildren
);

router.patch("/children/add-video-history", addVideoHistory);
router.patch("/children/clear-videos-history", clearVideosHistory);

router.put(
  "/children/:id/update-children-for-children",
  updateChildrenForChildren
);
router.put("/children/:id/update-children-for-parent", updateChildrenForParent);

router.delete("/children/delete-children", deleteChildren);

router.get("/children/list-childrens/:userId", listChildrens);

router.get("/children/:id", getChildren);

router.patch("/children/add-video-for-children", addVideoForChildren);
router.patch("/children/remove-video-for-children", removeVideoForChildren);

module.exports = router;
