var mongoose = require("mongoose");
const { Schema } = mongoose;

const meetingSchema = new Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    firstPossibleDay: { type: Date, required: true, min: '2021-09-15' },
    lastPossibleDay: { type: Date, required: true, min: '2021-09-15' },
    firstPossibleHour: { type: Number, required: true, min: 0, max: 23 },
    lastPossibleHour: { type: Number, required: true, min: 0, max: 23 },
    meetingName: { type: String },
    participantsList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Meeting", meetingSchema);
