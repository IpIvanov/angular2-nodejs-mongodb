import {Router, Response, Request} from "express";
let MongoClient = require('mongodb').MongoClient
    , assert = require('assert');


let mongoose = require('mongoose');
let User = require('../schemas/user.schema.js');


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

const userStatic = {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
    }
};


userRouter.get("/", (request: Request, response: Response) => {
    // Use connect method to connect to the Server
    const user = new User({
        "name": "Leanne Graham1",
        "password": "Bret"
    });
    user.save(function (err, data) {
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
