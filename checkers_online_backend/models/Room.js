const { Schema, model } = require('mongoose');

const roomSchema = new Schema({
    roomName: {
        type: String,
        required: true,
        unique: true
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    board: [[String]],
    whoIsNow: {
        type: String,
        required: true
    },
    playersId: [ {type: Schema.Types.ObjectId, ref: 'User'} ]
});

module.exports = model('Room', roomSchema);