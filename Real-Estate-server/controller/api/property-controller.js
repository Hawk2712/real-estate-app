const express = require("express");
const router = express.Router();
const repository = require('../../db/repository');
const { handleUpload } = require("../../middleware/fileUploadMiddleware");


/* Get all properties */
router.get('/', async (req, res, next) => {
    try {
        const response = await repository.getOwnerProperties(req.userId);
        res.status(200).json({
            success: true,
            data: response,
            message: `Available properties`
        });
    } catch (error) {
        next(error);
    }
});

/* Get a specific property */
router.get('/:id', async (req, res, next) => {
    try {
        const response = await repository.showPreferredProperty(req.params);
        const review = await repository.getPropertyReview(req.params);
        const responseData = response[0];

        let propertyData;

        if (responseData.owner_id === req.userId) {
            propertyData = { is_owner: true, ...responseData, review: review }
        } else {
            propertyData = { is_owner: false, ...responseData, review: review }
        }
        res.status(200).json({
            success: true,
            data: propertyData,
            message: `Preferred property`
        });
    } catch (error) {
        next(error);
    }
});

/* Create a new property */
router.post('/', handleUpload, async (req, res, next) => {
    try {
        const propertyData = req.body;
        if (req.file) {
            propertyData.image = req.file.path; // Ensure this is the correct path
        }
        await repository.propertyRegister(propertyData, req.userId);

        res.status(200).json({
            success: true,
            message: `Property Registered successfully`,
        });
    } catch (error) {
        next(error);
    }
})

/* Update a specific property */
router.put('/', handleUpload, async (req, res, next) => {
    try {

        const propertyData = req.body;
        if (req.file) {
            propertyData.image = req.file.path; // Ensure this is the correct path
        }
        await repository.updateProperty(propertyData);

        res.status(200).json({
            success: true,
            message: `Property Updated successfully`,
        });
    } catch (error) {
        next(error);
    }
})

/* Update property status */
router.put('/status', async (req, res, next) => {
    try {
        await repository.updatePropertyStatus(req.body);
        res.status(200).json({
            success: true,
            message: `User updated successfully`,
        });
    } catch (error) {
        next(error);
    }
})


module.exports = router;