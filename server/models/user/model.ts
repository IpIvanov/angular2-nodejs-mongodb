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
        email: String,
        name: String,
        birthday: String,
        avatarImg: String,
        accessToken: String
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
