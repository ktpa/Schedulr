const router = require("express").Router();
const { authenticateRequest } = require("./auth");
const { getUserFromToken } = require("./auth");
const meetingModel = require("../models/meetings");

router.get("/", authenticateRequest, (req, res) => {
    if (!req.token) {
        res.status(401);
    }

    getUserFromToken(req.token).then(async (user) => {
        if (!user) {
            res.status(403);
        }
        console.log(user._id)
        const meetings = await meetingModel.find({createdBy: user._id}, function (err, meetings) {
            if (err) { return next(err); }
            if (meetings === null) {
                return res.status(404).json({ "message": "Meeting not found" });
            };
        }).populate('[participantsList]');
        res.status(200).json({ data: meetings });
    });
});

router.post("/", authenticateRequest, async (req, res) => {
    if (!req.token) {
        res.status(401);
    }

    getUserFromToken(req.token).then((user) => {
        if (!user) {
            res.status(403);
        }
        try {
            const newMeeting = new meetingModel({
                createdBy: req.body.createdBy,
                firstPossibleDay: req.body.firstPossibleDay,
                lastPossibleDay: req.body.lastPossibleDay,
                firstPossibleHour: req.body.firstPossibleHour,
                lastPossibleHour: req.body.lastPossibleHour,
                meetingName: req.body.meetingName,
                participantsList: req.body.participantsList
            });
            newMeeting.save().then((doc) => res.status(200).json(doc));
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
        const meetings = await meetingModel.findOne({_id: req.params.id}, function (err, meeting) {
            if (err) { return next(err); }
            if (meeting === null) {
                return res.status(404).json({ "message": "Meeting not found" });
            };
        }).populate('[participantsList]');
        res.status(200).json({ data: meetings });
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
                update = { ...update, participantsList: req.body.participantsList }
            }

            const updatedMeeting = await meetingModel.findOneAndUpdate(
                { _id: req.params.id },
                update,
                {
                    new: true,
                    useFindAndModify: false,
                });
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
            meetingModel.findOneAndDelete({_id: req.body._id}, function (err, meeting) {
                if (err) { return next(err); }
                if (meeting === null) {
                    return res.status(404).json({ "message": "Meeting not found" });
                };
                res.json(meeting);
            });
        } catch (err) {
            res.status(500).json(err);
        }
    });
});

module.exports = router;


