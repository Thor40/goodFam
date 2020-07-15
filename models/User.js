const { Schema, model } = require('mongoose');

const UserSchema = new Schema ({
    UserName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        
    }
})