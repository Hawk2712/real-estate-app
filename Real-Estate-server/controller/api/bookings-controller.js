const express = require("express");
const router = express.Router();
const repository = require('../../db/repository');

/* Get all bookings */
router.get('/', async (req, res, next) => {
    try {
        const id = req.userId;

        const book_requested = await repository.getBookings(id);
        const book_requests = await repository.getBookings(null, id);

        const response = {
            requests: book_requests,
            requested: book_requested
        }

        res.status(200).json({
            success: true,
            data: response,
            message: `Bookings`,
        });
    } catch (error) {
        next(error);
    }
});



/* Create a new booking */
router.post('/', async (req, res, next) => {
    try {
        const isAlreadyBooked = await repository.alreadyBooked(req.userId, req.body.property_id);

        if (isAlreadyBooked) {
            throw new Error("You had already booked this property.Stay tuned for future updates")
        }
        await repository.createBookings(req.body, req.userId);
        res.status(200).json({
            success: true,
            message: `Booking created successfully`,
        });
    } catch (error) {
        next(error);
    }
})

/* Update a specific booking */
router.put('/', async (req, res, next) => {
    try {
        const {property_id} =req.body;
        await repository.updateBookingsStatus(req.body);   
        // await repository.updatePropertyStatus(property_id, "Sold");             
        res.status(200).json({
            success: true,
            message: `Success`,
        });
    } catch (error) {
        next(error);
    }
})

/* /* Delete a specific  booking */
router.delete('/:id', async (req, res, next) => {
    try {
        await repository.cancelBooking(req.params);
        res.status(200).json({
            success: true,
            message: `Success`,
        });
    } catch (error) {
        next(error);
    }
})

router.post('/add-review', async (req, res, next) => {
    try {
        await repository.createPropertyReview(req.body, req.userId);
        res.status(200).json({
            success: true,
            message: `Success`,
        });
    } catch (error) {
        next(error);
    }
})
module.exports = router;