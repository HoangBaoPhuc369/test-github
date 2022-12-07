const Children = require("../schemas/childrens.schema");

exports.createChildren = async (req, res) => {
  try {
    const children = await new Children(req.body).save();
    res.json(children);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getChildren = async (req, res) => {
  try {
    const childrenId = req.params.id;

    const children = await Children.findById(childrenId);
    res.json(children);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateChildrenForChildren = async (req, res) => {
  try {
    const childrenId = req.params.id;

    const children = await Children.findByIdAndUpdate(childrenId, req.body, {
      new: true,
    });
    res.json(children);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateChildrenForParent = async (req, res) => {
  try {
    const childrenId = req.params.id;

    const children = await Children.findByIdAndUpdate(childrenId, req.body, {
      new: true,
    });
    res.json(children);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateSecretPasswordChildren = async (req, res) => {
  try {
    const { childrenID, secretPassword } = req.body;
    const children = await Children.findByIdAndUpdate(
      childrenID,
      {
        $set: {
          secret_password: secretPassword,
        },
      },
      {
        new: true,
      }
    );
    res.json(children);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateContentSettingChildren = async (req, res) => {
  try {
    const { childrenID, contentSetting } = req.body;
    Children.findByIdAndUpdate(
      childrenID,
      {
        $set: {
          content_settings: contentSetting,
        },
      },
      {
        new: true,
      },
      () => {}
    );
    res.json("ok");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteSecretPasswordChildren = async (req, res) => {
  try {
    const { childrenID } = req.body;
    Children.findByIdAndUpdate(
      childrenID,
      {
        $set: {
          secret_password: "",
        },
      },
      {
        new: true,
      },
      () => {}
    );
    res.json("ok");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.addVideoHistory = async (req, res) => {
  try {
    const { childrenID, videoId, thumbnail, title } = req.body;
    const children = await Children.findByIdAndUpdate(
      childrenID,
      {
        $push: {
          historyWatchVideo: {
            videoId,
            thumbnail,
            title,
          },
        },
      },
      {
        new: true,
      }
    );
    res.json(children);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.clearVideosHistory = async (req, res) => {
  try {
    const { childrenID } = req.body;
    Children.findByIdAndUpdate(
      childrenID,
      {
        $set: {
          historyWatchVideo: [],
        },
      },
      {
        new: true,
      },
      () => {}
    );
    res.json("ok");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.listChildrens = async (req, res) => {
  try {
    const userId = req.params.userId;
    const children = await Children.find({ parentId: userId });
    res.json(children);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteChildren = async (req, res) => {
  try {
    const { childrenID } = req.body;
    Children.findByIdAndDelete(childrenID, {}, () => {});
    res.json("ok");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.addVideoForChildren = async (req, res) => {
  try {
    const { childrenId, videoId, thumbnail, title } = req.body;
    const children = await Children.findByIdAndUpdate(
      childrenId,
      {
        $push: {
          videos: {
            videoId,
            thumbnail,
            title,
          },
        },
      },
      {
        new: true,
      }
    );
    res.json(children);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.removeVideoForChildren = async (req, res) => {
  try {
    const { childrenId, videoId } = req.body;
    const children = await Children.findByIdAndUpdate(
      childrenId,
      {
        $pull: {
          videos: { videoId },
        },
      },
      {
        new: true,
      }
    );
    res.json(children);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
