const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    role_id: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    working_state: { type: Boolean, default: false },
    adjective: { type: String, required: false },
    features: [
        {
            feature: { type: String, required: true },
        }
    ],
    password: { type: String, required: true },
    date_time: { type: Date, default: Date.now },
    is_active: { type: Boolean, default: true }
});

module.exports = mongoose.model("User", userSchema);