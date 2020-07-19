const router = require('express').Router();
const { getThought,
        getThoughtById,
        addThought,
        removeThought,
        addReaction,
        removeReaction
    } = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/').get(getThought);

// /api/thoughts/<thoughtId>
router.route('/:id').get(getThoughtById);

router.route('/:userId/:thoughtId').delete(removeThought);

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId> (2 params, after deleteing comment, which user that thought originated from)
router.route(':userId/:thoughtId').put(addReaction);

// /api/thoughts/<userId>/<thoughtId>/<reactionId> (3 params, userId, thoughtId, reactionId to delete the corresponding reaction)
router.route('/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;