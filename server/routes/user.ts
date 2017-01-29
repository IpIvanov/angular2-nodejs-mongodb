import {Router, Response, Request} from "express";
let MongoClient = require('mongodb').MongoClient
    , assert = require('assert');


let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

let User = mongoose.model('userSchema', userSchema);


// Connection URL
let url = 'mongodb://heroku_mglrv19b:5infqoqqes5dro3etjqvv28l04@ds135689.mlab.com:35689/heroku_mglrv19b';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected.');
});

const userRouter: Router = Router();

const userStatic = new User({
    "username": "Bret",
    "password": "Sincere@april.biz"
});


userRouter.get("/", (request: Request, response: Response) => {
    userStatic.save(function (err, data) {
        if (err) {
            console.log(err);
            response.json(err);
        }
        else {
            response.json(data);
            console.log('Saved ', data);
        }
    });
});

export {userRouter};
