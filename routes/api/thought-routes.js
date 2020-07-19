const router = require('express').Router();
const { addThought,
        removeThought,
        addReaction,
        removeReaction
    } = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId> (2 params, after deleteing comment, which user that thought originated from)
router.route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought);

// /api/thoughts/<userId>/<thoughtId>/<reactionId> (3 params, userId, thoughtId, reactionId to delete the corresponding reaction)
router.route(':userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;