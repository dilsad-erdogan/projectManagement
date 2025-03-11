const mongoose = require("mongoose");

const periodSchema = new mongoose.Schema({
    job_id: { type: String, required: true },
    developer_id: { type: String, required: true },
    price: { type: Number, required: true },
    contract: { type: String, required: true },
    revised: { type: String, required: true },
    revised_state: { type: Boolean, default: true },
    approval_state: { type: Boolean, default: true },
    date_time: { type: Date, default: Date.now },
    is_active: { type: Boolean, default: true }
});

module.exports = mongoose.model("Period", periodSchema);