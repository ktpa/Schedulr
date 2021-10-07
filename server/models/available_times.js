var mongoose = require("mongoose");
const { Schema } = mongoose;

const availableTimeSchema = new Schema({
  availableTime: {
    type: Date,
  },
  meeting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meeting",
  }, // Not entirely sure this is needed, as all times will be linked to a user who in turn is linked to the meeting.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

availableTimeSchema.index(
  {
    user: 1,
    meeting: 1,
    availableTime: 1,
  },
  { unique: true }
);

module.exports = mongoose.model("AvailableTimes", availableTimeSchema);
