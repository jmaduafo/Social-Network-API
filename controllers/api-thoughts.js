const { User, Thought } = require('../models')

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts)
        } catch (err) {
            res.status(500).json({message: err})
        }
    },

    async getOneThought(req, res) {
        try {
            const oneThought = await Thought.findOne({_id: req.params.thoughtId}).select('-__v');

            if (!oneThought) {
                return res.status(404).json({ message: 'No post with that ID' });
              }

            res.json(oneThought);
        } catch (err) {
            res.status(500).json({message: err})
        }
    },
    async postThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: {thoughts: thought._id} },
                { new: true }
            )

            if (!user) {
                return res.status(400).json({message: 'User does not exist!'})
            }

            res.json({message: 'Create Post!'})
        } catch (err) {
            res.status(500).json(err);
        }
        
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughId },
                { $set: req.body},
                { new: true}
            )

            if (!thought) {
                return res.status(400).json({message: 'Thought was unable to be updated!'})
            }

            res.json({message: 'Thought was updated successfully!'})

        } catch (err) {
            res.status(500).json({message: err})
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughId },
                { new: true }
            )

            if (!thought) {
                return res.status(400).json({message: 'Thought was unable to be deleted!'})
            }

            res.json({message: 'Thought was deleted successfully!'})

        } catch (err) {
            res.status(500).json({message: err})
        }
    },

    async createReactionToThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidators: true, new: true } 
            )

            if (!thought) {
                return res.status(400).json({message: 'No thought found with this id!'})
            }

            res.json({message: 'Reaction was removed successfully!'})
        } catch (err) {
           res.status(500).json({message: err}) 
        }
    },

    async removeReactionToThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId }}},
                { runValidators: true, new: true } 
            )

            if (!thought) {
                return res.status(400).json({message: 'No thought found with this id!'})
            }

            res.json({message: 'Reaction was removed successfully!'})
        } catch (err) {
           res.status(500).json({message: err}) 
        }
    },
}