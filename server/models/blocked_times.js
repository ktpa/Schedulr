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

blockedTimeSchema.index({
    user: 1,
    blockedTime: 1
}, {unique: true})

module.exports = mongoose.model("BlockedTimes", blockedTimeSchema);