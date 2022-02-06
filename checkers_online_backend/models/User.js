const { Schema, model } = require('mongoose');

// Schema domyślnie dodaje unikalne pole _id, dlatego pomijamy je w deklaracji
const userSchema = new Schema({
    nickname: String,
    password: String,
});

module.exports = model('User', userSchema);