const router = require("express").Router();
const { authenticateRequest } = require("./auth");
const { getUserFromToken } = require("./auth");
const userModel = require("../models/user");

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
    });
    newUser.save().then((doc) => res.status(200).json(doc));
    // TODO(numank): Investigate authorizing user after signup.
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", authenticateRequest, function (req, res) {
  if (!req.token) {
    res.status(403);
  }

  getUserFromToken(req.token).then((user) => {
    if (!user) {
      res.status(403);
    }
    res.status(200).json({ data: user });
  });
});

module.exports = router;
