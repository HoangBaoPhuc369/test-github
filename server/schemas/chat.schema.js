const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  video_id: {
    type: String,
  },

  messages: [
    {
      name: {
        type: String,
      },

      picture: {
        type: String,
      },

      text: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Chat", chatSchema);
