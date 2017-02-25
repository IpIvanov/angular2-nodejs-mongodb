import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
    user: String,
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

let Predictions = mongoose.model('Predictions', schema);

export { Predictions }
