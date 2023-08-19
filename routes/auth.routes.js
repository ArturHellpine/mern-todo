const { Router } = require('express')
const router = Router()
const { register, login } = require("../controllers/UserController");
const { registerValidation, loginValidation } = require("../validations/authValidation");

router.post('/registration', registerValidation, register)
router.post('/login', loginValidation, login)

module.exports = router