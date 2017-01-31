let mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: Boolean,
    location: String,
    info: {
        age: Number,
        sex: String
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

let User = mongoose.model('User', schema)
export {User};