const mongoose = require("mongoose");

const agreementSchema = new mongoose.Schema({
    job_id: { type: String, required: true },
    developer_id: { type: String, required: true },
    price: { type: Number, required: true },
    contract: { type: String, required: true },
    date_time: { type: Date, default: Date.now },
    is_active: { type: Boolean, default: true }
});

module.exports = mongoose.model("Agreement", agreementSchema);