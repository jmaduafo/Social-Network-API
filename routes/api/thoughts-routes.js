const router = require('express').Router();

const { getThoughts, getOneThought, createThought, updateThought, deleteThought, 
createReactionToThought, removeReactionToThought } = require('../../controllers/api-thoughts')

router.route('/').get(getThoughts).post(createThought)
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought)
router.route('/:thoughtId/reactions').post(createReactionToThought).delete(removeReactionToThought)

module.exports = router