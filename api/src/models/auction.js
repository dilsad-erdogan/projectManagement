const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
    job_id: { type: String, required: true },
    developer_id: { type: String, required: true },
    price: { type: Number, required: true },
    approval_state: { type: Boolean, default: false },
    date_time: { type: Date, default: Date.now },
    is_active: { type: Boolean, default: true }
});

module.exports = mongoose.model("Auction", auctionSchema);