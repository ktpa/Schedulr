var mongoose = require("mongoose");
const { Schema } = mongoose;

const date = new Date()
const isoDate = date.toISOString().split('T')[0]

const blockedTimeSchema = new Schema({
    blockedTime: {
         type: Date, required: true, min: isoDate 
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