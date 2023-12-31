const mongoose = require('mongoose');
const reactionsSchema = require('./Reaction')

const thoughtsSchema = mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 28
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: (date) => {
            if (date) return date.toISOString().split("T") [0];
        }
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionsSchema]
}, 
{
    toJSON: {
        virtuals: true
    },
    id: false
})

thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})


const Thought = mongoose.model('thoughts', thoughtsSchema);

module.exports = Thought