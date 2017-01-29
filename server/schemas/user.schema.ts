let mongoose = require('mongoose');

interface IUser {
    name: string,
    password: any
}

// create a schema
const userSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    password: {type: String, required: true}
}, {collection: 'users'});

let User = mongoose.model<IUser>("User", userSchema);

export = User;