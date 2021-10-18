var mongoose = require("mongoose");
const { Schema } = mongoose;

const date = new Date()
const isoDate = date.toISOString().split('T')[0]

const meetingSchema = new Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    firstPossibleDay: { type: Date, required: true, min: isoDate },
    lastPossibleDay: { type: Date, required: true, min: isoDate },
    firstPossibleHour: { type: Number, required: true, min: 0, max: 23.5 },
    lastPossibleHour: { type: Number, required: true, min: 0, max: 23.5 },
    meetingName: { type: String, required: true },
    participantsList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }]
});

module.exports = mongoose.model("Meeting", meetingSchema);
