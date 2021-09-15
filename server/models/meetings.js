var mongoose = require("mongoose");
const { Schema } = mongoose;

const meetingSchema = new Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    firstPossibleDay: { type: String },
    lastPossibleDay: { type: String },
    firstPossibleHour: { type: String },
    lastPossibleHour: { type: String },
    meetingName: { type: String },
    participantsList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Meeting", meetingSchema);
