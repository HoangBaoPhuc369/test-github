const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
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
  },
});

module.exports = mongoose.model("Comments", commentsSchema);
