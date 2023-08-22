const { Router } = require('express')
const router = Router()
const { register, login, deleteUser } = require("../controllers/UserController");
const { registerValidation, loginValidation } = require("../validations/authValidation");

router.post('/registration', registerValidation, register)
router.post('/login', loginValidation, login)
router.delete('/delete/:id', deleteUser)

module.exports = router