const { Thought, User } = require('../models');
const { db } = require('../models/User');

const thoughtController = {
    // get all thoughts
    getThought(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
            .select('-__v')
            // sort thoughts from newest first in DESC order by _id
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // add thoughts to user
    addThought({ params, body }, res) {
        console.log(body);
        // create thought body
        Thought.create(body)
            .then(({ _id }) => {
                // return thought with user
                return User.findOneAndUpdate(
                    // update thought to user id
                    { _id: params.userId },
                    // push _id of thoughts to specific user
                    { $push: { thought: _id } },
                    // update new user with added thought
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                // respond with udated user data with thought
                res.json(dbUserData);
            })
            // if error, catch and respond with err as json
            .catch(err => res.json(err));
    },
    // add reactions
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // remove reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            // $pull to remove spefici reactions from the reactions array where reactionId matches the value of params.reactionID passed in from the route
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    // remove thought
    removeThought({ params }, res) {
        // find thought based onn though _id and deletes
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with that id!'});
            }
            // use deletedThought data to $pull from User model, and update the deletion from the thought
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thought: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            // respond with the updated user data without thought
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;