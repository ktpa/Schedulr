const router = require("express").Router();
const { authenticateRequest } = require("./auth");
const { getUserFromToken } = require("./auth");
const meetingModel = require("../models/meetings");

router.get("/", authenticateRequest, (req, res) => {
    if (!req.token) {
        res.status(401);
    }

    getUserFromToken(req.token).then((user) => {
        if (!user) {
            res.status(403);
        }
        meetingModel.find({participantsList: user._id}, function (err, meeting) {
            if (err) { return next(err); }
            if (meeting === null) {
                return res.status(404).json({ "message": "Meeting not found" });
            };
            res.status(200).json({ meeting: meeting });
        });
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

    getUserFromToken(req.token).then((user) => {
        if (!user) {
            res.status(403);
        }
        meetingModel.findOne({_id: req.body._id}, function (err, meeting) {
            if (err) { return next(err); }
            if (meeting === null) {
                return res.status(404).json({ "message": "Meeting not found" });
            };
            res.status(200).json({ meeting: meeting });
        }).populate('participantsList');
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


