const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date_time: { type: Date, default: Date.now },
    is_active: { type: Boolean }
});

module.exports = mongoose.model("Role", roleSchema);