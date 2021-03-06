const { User } = require('../models');
const { db } = require('../models/User');

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'thought',
            select: '-__V'
        })
            .select('-__V')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // get single user by _id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thought',
            select: '-__V'
        })
            .select('-__V')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // create a new User
    createUser({ body }, res) {
        const user = new User(body);
        User.create(user)
            .then(dbUserData => {
                res.json(dbUserData);
        })
            .catch(err => {
                res.json(err);
            });
    },

    // update User by id
    updateUser({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete User
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }, 
        // add friend
        addFriend({ params }, res) {
            User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { friends: { friendId: params.friendId } } },
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
        // remove friend
        removeFriend({ params }, res) {
            User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: { friendId: params.friendId } } },
                { new: true }
            )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
        },
};

module.exports = userController;