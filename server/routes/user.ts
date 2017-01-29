import {Router, Response, Request} from "express";
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');


// Connection URL
let url = 'mongodb://heroku_mglrv19b:5infqoqqes5dro3etjqvv28l04@ds135689.mlab.com:35689/heroku_mglrv19b';

const userRouter: Router = Router();

const user = {
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
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('users').insertOne(user);
        console.log("User inserted successfully!");

        db.close();
    });

    response.json(user);
});

export {userRouter};
