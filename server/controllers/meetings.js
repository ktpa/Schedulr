const router = require("express").Router();
const { authenticateRequest } = require("./auth");
const { getUserFromToken } = require("./auth");
const meetingModel = require("../models/meetings");
const availableTimeModel = require("../models/available_times");
const mongoose = require("mongoose");

router.get("/", authenticateRequest, (req, res) => {
  if (!req.token) {
    res.status(401);
  }

  getUserFromToken(req.token).then(async (user) => {
    if (!user) {
      res.status(403);
    }
    const meetings = await meetingModel
      .find({ participantsList: user._id }, function (err, meetings) {
        if (err) {
          return next(err);
        }
        if (meetings === null) {
          return res.status(404).json({ message: "Meeting not found" });
        }
      })
      .populate("participantsList", "-password");
    res.status(200).json({ data: meetings });
  });
});

router.post("/", authenticateRequest, (req, res) => {
  if (!req.token) {
    res.status(401);
  }

  getUserFromToken(req.token).then((user) => {
    if (!user) {
      res.status(403);
    }
    try {
      let participants = req.body.participantsList ?? [];
      
      if (typeof participants === "string") {
        participants = participants.split();
      }

      const newMeeting = new meetingModel({
        createdBy: user._id,
        firstPossibleDay: req.body.firstPossibleDay,
        lastPossibleDay: req.body.lastPossibleDay,
        firstPossibleHour: req.body.firstPossibleHour,
        lastPossibleHour: req.body.lastPossibleHour,
        meetingName: req.body.meetingName,
        participantsList: participants,
      });
      newMeeting.save().then(
        (doc) => res.status(200).json(doc),
        (err) => res.status(400).json(err)
      );
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

router.get("/:id", authenticateRequest, (req, res) => {
  if (!req.token) {
    res.status(401);
  }

  getUserFromToken(req.token).then(async (user) => {
    if (!user) {
      res.status(403);
    }
    const findOneMeeting = meetingModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
    ]);
    findOneMeeting
      .lookup({
        from: "blockedtimes",
        localField: "createdBy",
        foreignField: "user",
        as: "blockedTimes",
      })
      .project("-blockedTimes.user");
    // TODO(numank): We can fetch only blocked times after now().
    findOneMeeting
      .lookup({
        from: "users",
        localField: "participantsList",
        foreignField: "_id",
        as: "participantsList",
      })
      .project("-participantsList.password");
    findOneMeeting
      .lookup({
        from: "availabletimes",
        localField: "_id",
        foreignField: "meeting",
        as: "availableTimes",
      })
      .project("-availableTimes.meeting");
    // TODO(numank): We can populate users here as well.
    // Will be useful on the front end.
    findOneMeeting.exec().then(
      (meeting) => res.status(200).json(meeting),
      (err) => res.status(500).json(err)
    );
  });
});

router.patch("/:id", authenticateRequest, (req, res) => {
  if (!req.token) {
    res.status(401);
  }
  getUserFromToken(req.token).then(async (user) => {
    if (!user) {
      res.status(403);
    }
    try {
      var update = {};
      if (req.body.firstPossibleDay) {
        update = { ...update, firstPossibleDay: req.body.firstPossibleDay };
      }
      if (req.body.lastPossibleDay) {
        update = { ...update, lastPossibleDay: req.body.lastPossibleDay };
      }
      if (req.body.firstPossibleHour) {
        update = { ...update, firstPossibleHour: req.body.firstPossibleHour };
      }
      if (req.body.lastPossibleHour) {
        update = { ...update, lastPossibleHour: req.body.lastPossibleHour };
      }
      if (req.body.meetingName) {
        update = { ...update, meetingName: req.body.meetingName };
      }
      if (req.body.participantsList) {
        update = { ...update, participantsList: req.body.participantsList };
      }

      const updatedMeeting = await meetingModel.findOneAndUpdate(
        { _id: req.params.id },
        update,
        {
          new: true,
          useFindAndModify: false,
        }
      );
      res.status(200).json(updatedMeeting);
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
    try {
      meetingModel.findOneAndDelete(
        { _id: req.body._id },
        function (err, meeting) {
          if (err) {
            return next(err);
          }
          if (meeting === null) {
            return res.status(404).json({ message: "Meeting not found" });
          }
          res.json(meeting);
        }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

router.post("/:id/availableTimes", authenticateRequest, (req, res) => {
  if (!req.token) {
    res.status(401);
  }

  getUserFromToken(req.token).then((user) => {
    if (!user) {
      res.status(403);
    }
    try {
      if (typeof req.body.availableTime === "string") {
        const newAvailableTime = new availableTimeModel({
          availableTime: req.body.availableTime,
          user: user._id,
          meeting: req.params.id,
        });
        newAvailableTime.save().then(
          (doc) => res.status(200).json(doc),
          (err) => res.status(400).json(err)
        );
      } else {
        var timeArray = [];
        req.body.availableTime.map((time) => {
          timeArray.push({
            availableTime: time,
            user: user._id,
            meeting: req.params.id,
          });
        });

        availableTimeModel.insertMany(timeArray, (err, docs) => {
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

router.delete(
  "/:meetingid/availableTimes/:id",
  authenticateRequest,
  (req, res) => {
    if (!req.token) {
      res.status(401);
    }

    getUserFromToken(req.token).then(async (user) => {
      if (!user) {
        res.status(403);
      }
      try {
        const deletedTime = await availableTimeModel.findByIdAndDelete(
          req.params.id
        );
        if (deletedTime === null) {
          return res.status(404).json({ message: "Available time not found" });
        }
        res.status(200).json(deletedTime);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  }
);

module.exports = router;