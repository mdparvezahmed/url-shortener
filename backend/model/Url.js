const mongoose = require('mongoose');


const urlSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    originalUrl: {
        type: String,
        required: true
    },
    shortcode: {
        type: String,
        required: true,
        unique: true
    },
    clicks:{
        type: Number,
        default: 0
    }
}, { timestamps: true });


const Url = mongoose.model("Url", urlSchema);

module.exports = Url;