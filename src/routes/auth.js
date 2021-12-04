const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Models
const UserModel = require('../model/user')

const register = async (req, res, next) => {
  const { password, email } = req.body || ''

  try {
    const checkEmail = await UserModel.findOne({ email })

    if (checkEmail) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    bcrypt.hash(password, 10, (err, hashedPass) => {
      if (err) {
        res.send({
          message: err,
          status: 500
        })
      }

      const newUser = {
        email,
        password: hashedPass
      }

      const user = new UserModel(newUser)
      user
        .save()
        .then(() => {
          res.send({
            message: 'Register successfully',
            status: 200
          })
        })
        .catch(() => {
          res.send({
            message: 'An error occurred!',
            status: 500
          })
        })
    })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

const login = async (req, res) => {
  const { password, email } = req.body || ''

  UserModel.findOne({ email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.send({
            message: err,
            status: 500
          })
        }

        if (result) {
          let token = jwt.sign({ email: user.email }, 'secretRemiValue', {
            expiresIn: '1h'
          })

          res.send({
            message: 'Login successfully',
            token,
            status: 200
          })
        } else {
          res.send({
            message: 'Password does not matched',
            status: 400
          })
        }
      })
    } else {
      res.json({
        message: 'No user found!',
        status: 500
      })
    }
  })
}

module.exports = {
  register,
  login
}
