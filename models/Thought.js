const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// reaction schema only
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: "Must have text",
            max: [280, 'No more than 280 characters!'] 
        },
        username: {
            type: String,
            required: true
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
)

const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        min: [1, 'Thoughts are between 1 and 128 characters long!'],
        max: 128
    },
     createdAt: {
         type: Date,
         default: Date.now,
         get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YY [at] hh:mm a')
     },
     username: {
         type: String
     },
     // reactions
     reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

// virtual reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;