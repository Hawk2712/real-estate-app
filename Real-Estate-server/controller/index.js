const router = require('express').Router();

const authRoutes = require('./api/auth-controller');
const propertyRoutes = require('./api/property-controller');
const bookingsRoutes = require('./api/bookings-controller');
const onsiteRoutes = require('./api/onsite-controller');
const userRoutes = require('./api/user-controller');

const verifyToken = require('../middleware/authMiddleware');

router.use('/api/auth', authRoutes);
router.use('/api/property', verifyToken, propertyRoutes);
router.use('/api/booking', verifyToken, bookingsRoutes);
router.use('/api/onsite', verifyToken, onsiteRoutes);
router.use('/api/users', verifyToken, userRoutes);

router.use('/api', (req, res) => res.status(404).json('No API route found'));

module.exports = router;