const { createChat, addMessageChat, updateMessageChat, deleteMessageChat, getChatMessages } = require("../controllers/chat");

const router = require("express").Router();

router.post("/chat/create-chat", createChat);
router.get("/chat/get-chat-messages/:videoId", getChatMessages);
router.patch("/chat/add-message-chat", addMessageChat);
router.patch("/chat/update-message-chat", updateMessageChat);
router.patch("/chat/delete-message-chat", deleteMessageChat);

module.exports = router;
