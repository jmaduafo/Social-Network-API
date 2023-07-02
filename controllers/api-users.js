const { User } = require('../models')

module.exports = {
    async getUsers(req, res) {
        try {
            const user = await User.find();
            res.json(user)
        } catch (err) {
            res.status(500).json({message: err})
        }
    },

    async getOneUser(req, res) {
        try {
            const oneUser = await User.findOne(
                { _id: req.params.userId}
            ).populate('thoughts').populate('friends').select('-__v')

            if (!oneUser) {
                return res.status(400).json({message: 'User cannot be found!'})
            }

            res.json(oneUser)
         } catch (err) {
            res.status(500).json({message: err})
         }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body)

            if (!user) {
                return res.status(400).json({message: 'User cannot be found!'})
            }

            res.json({ message: 'User created successfully!'})
         } catch (err) {
            res.status(500).json({message: err})
         }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $set: req.body },
                { runValidators: true, new: true}
            )

            if (!user) {
                return res.status(400).json({message: 'User id cannot be found!'})
            }

            res.json({ message: 'User updated successfully!'})
         } catch (err) {
            res.status(500).json({message: err})
         }
    },
    
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete(
                { _id: req.params.userId}
            )

            if (!user) {
                return res.status(400).json({message: 'User id cannot be found!'})
            }

            res.json({ message: 'User deleted successfully!'})
         } catch (err) {
            res.status(500).json({message: err})
         }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $addToSet: { friends: req.params.friendId }},
                { runValidators: true, new: true}
            )

            if (!user) {
                return res.status(400).json({message: 'User id cannot be found thus friend cannot be added!'})
            }

            res.json({ message: 'Friend added successfully!'})
         } catch (err) {
            res.status(500).json({message: err})
         }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $pull: { friends: req.params.friendId }},
                { new: true}
            )

            if (!user) {
                return res.status(400).json({message: 'User id cannot be found thus friend cannot be removed!'})
            }

            res.json({ message: 'Friend removed successfully!'})
         } catch (err) {
            res.status(500).json({message: err})
         }
    }
}