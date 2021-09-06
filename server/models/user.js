import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    id: {type: String, required: true}, 
    name:  String, // String is shorthand for {type: String}
    email: String
});

//Export function to create "userSchema" model class
module.exports = mongoose.model( 'User', UserSchema );