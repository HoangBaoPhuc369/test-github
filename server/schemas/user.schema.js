const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  google_id: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: [true, "name is required"],
  },

  email: {
    type: String,
    required: [true, "email is required"],
  },

  secret_password: {
    type: String,
  },

  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
  },

  childrens: [
    {
      type: String,
    },
  ],

  access_token: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
