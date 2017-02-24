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
    predictions: [{
        awayTeamName: String,
        homeTeamName: String,
        date: String,
        odds: {
            awayWin: Number,
            draw: Number,
            homeWin: Number
        },
        result: {
            goalsAwayTeam: Number,
            goalsHomeTeam: Number
        },
        prediction: String,
        winningPrediction: Boolean
    }],
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
