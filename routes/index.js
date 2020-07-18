const router = require('express').Router();
// import alll API routes from /api/index.js
const apiRoutes = require('./api');

// all prefix to all api routes imported from api directory
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).json({ message: 'API error!'});
});

module.exports = router;