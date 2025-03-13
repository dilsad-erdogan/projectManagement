const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    customer_id: { type: String, required: true },
    title: { type: String, required: true },
    short_description: { type: String, required: true },
    long_description: { type: String, required: true },
    min_price: { type: Number, required: true, unique: true },
    max_price: { type: Number, required: true },
    duration: { type: String, required: true },
    starting_state: { type: Boolean, default: false },
    completion_state: { type: Boolean, default: false },
    difficulty_state: { type: Boolean, default: true },
    date_time: { type: Date, default: Date.now },
    is_active: { type: Boolean, default: true }
});

module.exports = mongoose.model("Job", jobSchema);