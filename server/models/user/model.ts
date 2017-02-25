import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
    local: {
        email: { type: String, unique: true },
        password: String,
        avatarImg: String,
        salt: String,
        token: String
    },
    facebook: {
        id: { type: String, unique: true },
        gender: String,
        token: String,
        email: String,
        name: String,
        avatarImg: String
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
