let mongoose = require("mongoose");

export function DatabaseConInit() {
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://heroku_mglrv19b:5infqoqqes5dro3etjqvv28l04@ds135689.mlab.com:35689/heroku_mglrv19b");
};