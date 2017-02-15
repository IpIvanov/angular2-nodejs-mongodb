let mongoose = require('mongoose');

export function DatabaseConInit() {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://heroku_1cbz1f18:2n4h8hv4htsoej0adkcrprnq2o@ds153729.mlab.com:53729/heroku_1cbz1f18');
}
