const UserModel = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: 'Некоректні дані при авторизації' })
        }
        const { email, password } = req.body
        const user = await UserModel.findOne({ email: email })
        if(!user) {
            return res.status(400).json({ message: 'Такого користувача не існує' })
        }
        const isMatched = await bcrypt.compare(password, user.password)
        if(!isMatched) {
            return res.status(400).json({ message: 'Невірний пароль' })
        }
        const jwtSecret = 'secret_key_123'
        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' })
        res.json({ userId: user.id, token, userName: user.fullName })
    } catch (err) {
        console.log(err)
    }
}

const register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: 'Некоректні дані при реєстрації' })
        }
        const { fullName, email, password } = req.body
        const isUsed = await UserModel.findOne({ email: email })
        if(isUsed) {
            return res.status(300).json({ message: 'Електрона адреса вже зареєстрована' })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const createdUser = new UserModel({ email, fullName, password: hashedPassword })
        await createdUser.save()
        const jwtSecret = 'secret_key_123'
        const token = jwt.sign({ userId: createdUser.id}, jwtSecret, {expiresIn: '1h' })
        res.json({ userId: createdUser.id, token, userName: createdUser.fullName })
    } catch (err) {
        console.log(err)
    }
}


module.exports = { register, login }