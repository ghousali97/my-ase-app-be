const express = require('express');
const authController = require('../controllers/auth');


const router = express.Router();


router.post("/login", authController.login);
router.get("/all", authController.allUsers);
router.get("/secret", authController.getSecretFromKv);
module.exports = router;