const mongoose = require('mongoose')

const NotificationSchema = mongoose.Schema({
    notification_type: {
        type: String,
    },
    message: {
        type: String,
    },
    status: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification