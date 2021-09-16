var mongoose = require("mongoose");
const { Schema } = mongoose;

const blockedTimeSchema = new Schema({
    blockedTime: {
        type: Date
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }
});

module.exports = mongoose.model("BlockedTimes", blockedTimeSchema);