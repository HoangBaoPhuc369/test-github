const Chat = require("../schemas/chat.schema");

exports.createChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndUpdate(
      { video_id: req.body.videoId },
      {},
      { upsert: true, new: true }
    );
    res.json(chat);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getChatMessages = async (req, res) => {
  try {
    const { videoId } = req.params;
    const chat = await Chat.findOne({ video_id: videoId });
    res.json(chat.messages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.addMessageChat = async (req, res) => {
  try {
    const { chatId, name, picture, text } = req.body;
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {
          messages: {
            name: name,
            picture: picture,
            text: text,
          },
        },
      },
      {
        new: true,
      }
    );
    res.json(chat);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateMessageChat = async (req, res) => {
  try {
    const { chatId, name, picture, text, messageId } = req.body;
    const chat = await Chat.findOneAndUpdate(
      { _id: chatId, "messages._id": messageId },
      {
        "messages.$.name": name,
        "messages.$.picture": picture,
        "messages.$.text": text,
      },
      {
        new: true,
      }
    );
    res.json(chat);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteMessageChat = async (req, res) => {
  try {
    const { chatId, messageId } = req.body;
    const chat = await Chat.findOneAndUpdate(
      { _id: chatId },
      {
        $pull: {
          messages: {
            _id: messageId,
          },
        },
      },
      {
        new: true,
      }
    );
    res.json(chat);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
