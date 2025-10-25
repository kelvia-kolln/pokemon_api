import mongoose from "mongoose";

const {Schema} = mongoose;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['admin', 'staff', 'visitor'] }
})

export default mongoose.model('User', UserSchema, 'users')
