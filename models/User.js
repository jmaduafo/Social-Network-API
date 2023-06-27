const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String, 
        required: [true, 'Please enter an Email Address'],
        unique: true,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Please add a valid email address'],
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thoughts'
        }
    ],
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ]
},
{
    toJSON: {
        getters: true
    },
    id: false
})

const User = model('users', userSchema);

module.exports = User