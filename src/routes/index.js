const express = require('express')
const mongoose = require('mongoose')
const router = express()
const config = require('config');

// Routes
const getVideos = require('./getVideos');
const shareVideo = require('./shareVideo');
const { register, login } = require('./auth');

// Constants
const dbConfig = config.get('FunnyMovie.dbConfig.dbName');

mongoose.connect(
  dbConfig,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
  console.log('Connect Atlas MongoDB successfully')
}).catch((err) => {
  console.log('Connect Atlas MongoDB failure', err)
})

router.get('/api/videos', getVideos)
router.post('/api/sharevideo', shareVideo)
router.post('/api/auth/register', register)
router.post('/api/auth/login', login)

module.exports = router
