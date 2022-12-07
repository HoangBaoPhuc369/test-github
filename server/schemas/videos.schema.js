const mongoose = require("mongoose");

const videosSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "user id is required"],
  },

  thumbnail: {
    type: String,
  },

  restrics: {
    type: String,
    enum: ["kiddie", "teen"],
  },

  comments: [
    {
      video_id: {
        type: String,
      },

      question: {
        type: String,
      },

      parentCmtId: {
        type: String,
      },

      commentByParent: {
        type: String,
      },

      commentByChild: {
        type: String,
      }
    },
  ],
});

module.exports = mongoose.model("Videos", videosSchema);
