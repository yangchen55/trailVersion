import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "active"

    },
    associate: {
        type: String,
        default: ""

    },
    token: {
        type: String,
        default: ""

    },
}, {
    timestamps: true
}
)

export default mongoose.model("Session", SessionSchema)