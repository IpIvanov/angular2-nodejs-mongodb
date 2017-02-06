let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    location: String,
    token: {
        type: String,
        default: ''
    }
    info: {
        sex: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

let User = mongoose.model('User', schema);

export { User }
