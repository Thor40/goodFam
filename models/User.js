const { Schema, model } = require('mongoose');

// User Schema
const UserSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
        },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true,
        validate: {
            validator: function(isEmail) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(isEmail);
            },
            message: 'Please enter a valid email'
        },
        },
    thoughts: {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
        },
    friends: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// virtual that keeps count of the friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friends) => total + friends.thoughts.length + 1, 0);
});

// create user model
const User = model('User', UserSchema);

module.exports = User;