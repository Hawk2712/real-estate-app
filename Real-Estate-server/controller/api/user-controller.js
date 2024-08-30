const express = require("express");
const router = express.Router();
const repository = require('../../db/repository');
const { handleUpload } = require("../../middleware/fileUploadMiddleware");

/* Get all  users */
router.get('/', async (req, res, next) => {
    try {
        const response = await repository.getAllUsers();
        res.status(200).json({
            success: true,
            data: response,
            message: `Available users`
        });
    } catch (error) {
        next(error);
    }
});

/* Get a specific user */
router.get('/:id', async (req, res, next) => {
    try {

        res.status(200).json({
            success: true,

            message: `Preferred user`
        });
    } catch (error) {
        next(error);
    }
});

/* Update user status */
router.put('/status', async (req, res, next) => {
    try {
        await repository.updateUserStatus(req.body);
        res.status(200).json({
            success: true,
            message: `User updated successfully`,
        });
    } catch (error) {
        next(error);
    }
})

/* Update a specific user */
router.put('/', handleUpload, async (req, res, next) => {
    try {

        const { contact, email } = req.body;
        const userId = req.userId;

        const contactExists = await repository.isContactExists(contact, userId);
        if (contactExists) {
            throw new Error('Contact already exists');
        }

        const emailExists = await repository.isEmailExists(email, userId);
        if (emailExists) {
            throw new Error('Email already exists');
        }

        await repository.updateProfile(req);
        res.status(200).json({
            success: true,
            message: `Successfully updated`,
        });
        res.status(200).json({
            success: true,
            message: `Property Updated successfully`,
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;