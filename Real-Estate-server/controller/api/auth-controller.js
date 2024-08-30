const express = require("express");
const router = express.Router();
const repository = require('../../db/repository');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../../utils/env-helper");
const { hashPassword } = require("../../utils/custom");
const verifyToken = require("../../middleware/authMiddleware");
const { handleUpload } = require("../../middleware/fileUploadMiddleware");


router.post("/register", async (req, res, next) => {
    try {
        const { email, contact, password } = req.body;


        const contactExists = await repository.isContactExists(contact);
        if (contactExists) {
            throw new Error('Contact already exists');
        }

        const emailExists = await repository.isEmailExists(email);
        if (emailExists) {
            throw new Error('Email already exists');
        }

        const hashedPassword = await hashPassword(password);

        const body = { hashPassword: hashedPassword, ...req.body };

        await repository.register(body);

        res.status(200).json({
            success: true,
            message: `User Registered successfully`,
        });
    } catch (error) {
        next(error);
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { password } = req.body;
        const result = await repository.login(req.body);

        if (result.length === 0) {
            throw new Error("User not Found");
        }

        const user = result[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Invalid credentials');
        }

        if (user.is_active === 0) {
            throw new Error("Access denied ! .Please contact admin for future assistance");
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: '6h',
        });

        const response = {
            accessToken: token,
            role: user.user_type,
            image: user.image
        }
        res.status(200).json({
            success: true,
            data: response,
            message: `Login Success`
        });

    } catch (error) {
        next(error);
    }
})

router.get("/show-all-properties", async (req, res, next) => {
    try {
        let params = undefined;

        if (req.query.params) {
            params = req.query.params;
        }

        const response = await repository.showProperties(null, params);
        res.status(200).json({
            success: true,
            data: response,
            message: `Available properties`
        });
    } catch (error) {
        next(error);
    }
})
router.get("/show-others-properties", verifyToken, async (req, res, next) => {
    try {
        const response = await repository.showProperties(req.userId);
        res.status(200).json({
            success: true,
            data: response,
            message: `Available properties`
        });

    } catch (error) {
        next(error);
    }
})

router.get("/get-user", verifyToken, async (req, res, next) => {
    try {
        const response = await repository.getUser(req.userId);
        res.status(200).json({
            success: true,
            data: response[0],
            message: `user`
        });
    } catch (error) {
        next(error);
    }
})

router.put('/update-profile', verifyToken, handleUpload, async (req, res, next) => {
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
    } catch (error) {
        next(error);
    }
})

module.exports = router;