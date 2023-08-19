const { check } = require('express-validator')

const registerValidation = [
    check('email', 'Невірний формат email').isEmail(),
    check('fullName', 'Введіть коректне імя').isLength({ min: 3 }),
    check('password', 'Пароль повинен містити не менше 6-ти символів').isLength({ min: 6 })
]

const loginValidation = [
    check('email', 'Некоректний формат email').isEmail(),
    check('password', 'Некоректний формат').exists()
]

module.exports = { registerValidation, loginValidation }