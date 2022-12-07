const User = require("../schemas/user.schema");

exports.updateSecretPassword = async (req, res) => {
  try {
    const { userId, secretPassword } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          secret_password: secretPassword,
        },
      },
      {
        new: true,
      }
    );
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


