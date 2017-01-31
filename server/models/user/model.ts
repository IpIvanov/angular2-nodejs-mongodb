import {mongoose} from "../../config/database";
import {Schema, Model, Document} from "mongoose";

export interface IUser extends Document {
    name: string;
    username: string,
    password: string,
    admin: boolean,
    location: string,
    info: {
        age: number,
        sex: string
    },
    created_at: Date,
    updated_at: Date
}

export interface IUserModel {
    updateUser(id: {}, name: string): Promise<{ nModified: number }>
}

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

schema.static("updateUser", (user: {}, name: string) => {
    return User
        .update({
            "_id": user
        }, {
            "$set": {
                "name": name
            }
        })
        .exec();
});

export type UserModel = Model<IUser> & IUserModel & IUser;

export const User: UserModel = <UserModel>mongoose.model<IUser>("User", schema);