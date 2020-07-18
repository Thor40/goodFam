const router = require('express').Router();
const userController = require('../../controllers/user-controller');
const userRoutes = require('./user-routes');

// add prefixes to routes
router.use('/user', userRoutes);

module.exports = router;