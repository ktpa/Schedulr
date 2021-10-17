const router = require("express").Router();
const { authenticateRequest } = require("./auth");
const { getUserFromToken } = require("./auth");
const userModel = require("../models/users");
const blockedTimeModel = require("../models/blocked_times");
const lodash = require("lodash");

router.post("/", async (req, res) => {
  var publicFields = ["_id", "username", "email", "name"];
  try {
    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      profilePicUrl: req.body.profilePicUrl,
    });
    newUser.save().then(
      (doc) => res.status(200).json(lodash.pick(doc, publicFields)),

      (err) => {
        const errorMessage =
          err.code === 11000 ? `${Object.keys(err.keyValue)}_in_use` : err;
        res.status(400).json({ errorMessage });
      }
    );
    // TODO(numank): Investigate authorizing user after signup.
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO() Only used for passing requirements
// Remove once project has been graded
router.get("/", (req, res) => {
  userModel.find(function (err, users) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ data: users });
  });
});

// TODO() Only used for passing requirements
// Remove once project has been graded
router.delete("/", authenticateRequest, (req, res) => {
  if (!req.token) {
    res.status(401);
  }

  getUserFromToken(req.token).then((user) => {
    if (!user && user.username !== "admin") {
      res.status(403);
    }
    try {
      userModel.remove(function (err, x) {
        if (err) {
          return next(err);
        }
        res.status(200).json({ removedRecords: x.deletedCount });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

// TODO() Only used for passing requirements
// Remove once project has been graded
router.put("/:id", async (req, res) => {
  let update = req.body.user;
  try {
    let updatedUser = await userModel.findOneAndReplace(
      { _id: req.params.id },
      update,
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", authenticateRequest, (req, res) => {
  if (!req.token) {
    res.status(401);
  }

  getUserFromToken(req.token).then((user) => {
    if (!user) {
      res.status(403);
    }
    res.status(200).json({ data: user });
  });
});

router.patch("/:id", authenticateRequest, async (req, res) => {
  if (!req.token) {
    res.status(401);
  }

  getUserFromToken(req.token).then(async (user) => {
    if (!user) {
      res.status(403);
    }
    try {
      var update = {};
      if (req.body.name) {
        update = { ...update, name: req.body.name };
      }
      if (req.body.password) {
        update = { ...update, password: req.body.password };
      }
      if (req.body.profilePicUrl) {
        update = { ...update, profilePicUrl: req.body.profilePicUrl };
      }

      let updatedUser = await userModel.findOneAndUpdate(
        { _id: user.id },
        update,
        {
          new: true,
          useFindAndModify: false,
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

router.delete("/:id", authenticateRequest, (req, res) => {
  if (!req.token) {
    res.status(401);
  }

  getUserFromToken(req.token).then((user) => {
    if (!user) {
      res.status(403);
    }
    user.remove().then((response) => {
      res.status(200).json(response);
    });
  });
});

router.get("/:id/blockedTimes", authenticateRequest, (req, res) => {
  if (!req.token) {
    res.status(401);
  }

  getUserFromToken(req.token).then((user) => {
    if (!user) {
      res.status(403);
    }
    blockedTimeModel.find({ user: user._id }, function (err, meetings) {
      if (err) {
        return next(error);
      } else {
        res.status(200).json(meetings);
      }
    });
  });
});

router.post("/:id/blockedTimes", authenticateRequest, (req, res) => {
  if (!req.token) {
    res.status(401);
  }

  getUserFromToken(req.token).then(async (user) => {
    if (!user) {
      res.status(403);
    }
    try {
      if (typeof req.body.blockedTime === "string") {
        const newBlockedTime = new blockedTimeModel({
          blockedTime: req.body.blockedTime,
          user: user._id,
        });
        newBlockedTime.save().then(
          (doc) => res.status(200).json(doc),
          (err) => res.status(400).json(err)
        );
      } else {
        var timeArray = [];
        req.body.blockedTime.map((time) => {
          timeArray.push({
            blockedTime: time,
            user: user._id,
          });
        });

        blockedTimeModel.insertMany(timeArray, (err, docs) => {
          if (err) {
            res.status(500).json(err);
          }
          res.status(200).json(docs);
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

router.delete("/:userid/blockedTimes/:id", authenticateRequest, (req, res) => {
  if (!req.token) {
    res.status(401);
  }

  getUserFromToken(req.token).then(async (user) => {
    if (!user) {
      res.status(403);
    }

    const deletedTime = await blockedTimeModel.findByIdAndDelete(req.params.id);
    if (deletedTime === null) {
      return res.status(404).json({ message: "Blocked time not found" });
    }
    res.status(200).json(deletedTime);
  });
});

// TODO() Only used for passing requirements
// Remove once project has been graded.
router.get("/:userid/blockedTimes/:id", authenticateRequest, (req, res) => {
  if (!req.token) {
    res.status(401);
  }

  getUserFromToken(req.token).then(async (user) => {
    if (!user) {
      res.status(403);
    }

    const blockedTime = await blockedTimeModel.findById(req.params.id);
    if (blockedTime === null) {
      return res.status(404).json({ message: "Blocked time not found" });
    }
    res.status(200).json(blockedTime);
  });
});

module.exports = router;
