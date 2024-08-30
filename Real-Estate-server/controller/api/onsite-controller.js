const express = require("express");
const router = express.Router();
const repository = require('../../db/repository');

/* Get all onsite */
router.get('/', async (req, res, next) => {
    try {

        const id = req.userId;

        const book_requested = await repository.getOnsiteRequests(id);
        const book_requests = await repository.getOnsiteRequests(null, id);

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



/* Create a new onsite */
router.post('/', async (req, res, next) => {
    try {
        const isAlreadyRequested = await repository.alreadyRequested(req.userId, req.body.property_id, req.body.date);

        if (isAlreadyRequested) {
            throw new Error("You had already requested for onsite view on this date.Stay tuned for future updates")
        }
        await repository.createOnsiteRequest(req.body, req.userId);
        res.status(200).json({
            success: true,
            message: ` created successfully`,
        });
    } catch (error) {
        next(error);
    }
})

/* Update a specific onsite */
router.put('/', async (req, res, next) => {
    try {
        await repository.updateRequestStatus(req.body);
        res.status(200).json({
            success: true,
            message: `Success`,
        });
    } catch (error) {
        next(error);
    }
})

/* /* Delete a specific  onsite */
router.delete('/:id', async (req, res, next) => {
    try {
        await repository.cancelRequest(req.params);
        res.status(200).json({
            success: true,
            message: `Success`,
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;