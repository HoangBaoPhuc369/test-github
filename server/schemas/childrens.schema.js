const mongoose = require("mongoose");

const childrensSchema = mongoose.Schema({
  parentId: {
    type: String,
    required: [true, "parent id is required"],
  },

  name: {
    type: String,
  },

  year: {
    type: String,
  },

  month: {
    type: String,
  },

  secret_password: {
    type: String,
  },

  content_settings: {
    type: String,
    enum: ["self-approval", "kiddie", "teen"], //kiddie (3->10) teen (11->14)
  },

  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
  },

  videos: [
    {
      videoId: {
        type: String,
      },
      thumbnail: {
        type: String,
      },
      title: {
        type: String,
      },
    },
  ],

  historyWatchVideo: [
    {
      videoId: {
        type: String,
      },
      thumbnail: {
        type: String,
      },
      title: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Childrens", childrensSchema);
