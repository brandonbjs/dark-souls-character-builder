import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    characterBuilds: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'characterBuilds'
    }]
});

const UserModel = mongoose.model("users", UserSchema)

export { UserModel };