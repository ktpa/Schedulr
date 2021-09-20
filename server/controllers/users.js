const router = require("express").Router();
const { authenticateRequest } = require("./auth");
const { getUserFromToken } = require("./auth");
const userModel = require("../models/users");
const blockedTimeModel = require("../models/blocked_times");

router.post("/signup", async (req, res) => {
  try {
    userModel
      .findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      })
      .then((user) => {
        if (user)
          return res
            .status(400)
            .json({ invalidParams: "Email or username is already in use!" });
      });
    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      profilePicUrl: req.body.profilePicUrl
    });
    newUser.save().then((doc) => res.status(200).json(doc));
    // TODO(numank): Investigate authorizing user after signup.
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", authenticateRequest, (req, res) => {
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

router.patch("/profile", authenticateRequest, async (req, res) => {
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

router.delete("/", authenticateRequest, (req, res) => {
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

router.post("/:id/blockedTimes", authenticateRequest, (req, res) => {
  if (!req.token) {
    res.status(401);
  }

  getUserFromToken(req.token).then(async (user) => {
    if (!user) {
      res.status(403);
    }
    if (typeof req.body.blockedTime === "string") {
      try {
          const newBlockedTime = new blockedTimeModel({
            blockedTime: req.body.blockedTime,
            user: user._id
          });
          newBlockedTime.save().then(doc => res.status(200).json(doc), (err) => res.status(400).json(err));
        } catch (err) {
          res.status(500).json(err);
        }
    } else {
    var timeArray = [];
    req.body.blockedTime.map((time) => {
      timeArray.push({
        blockedTime: time,
        user: user._id
      })
    })

    blockedTimeModel.insertMany(timeArray, (err, docs) => {
      if(err) {
        res.status(500).json(err);
      }
        res.status(200).json(docs);
    })
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
      return res.status(404).json({ "message": "Blocked time not found" });
    }
      res.status(200).json(deletedTime);
  });
});

module.exports = router;
