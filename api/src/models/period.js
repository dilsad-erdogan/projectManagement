const mongoose = require("mongoose");

const periodSchema = new mongoose.Schema({
    job_id: { type: String, required: true },
    developer_id: { type: String, required: true },
    price: { type: Number, required: true },
    contract: { type: String },
    revised: { type: String },
    revised_state: { type: Boolean, default: false },
    approval_state: { type: Boolean, default: false },
    date_time: { type: Date, default: Date.now },
    is_active: { type: Boolean, default: true }
});

module.exports = mongoose.model("Period", periodSchema);