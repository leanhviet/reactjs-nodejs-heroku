const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./src/routes')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()

const { PORT } = process.env || 3000

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((req, res, next) => {
  bodyParser.json()(req, res, (err) => {
    if (err) {
      console.log('Unexpected error while parsing json body', err)
      return res.status(400).send({
        message: 'Invalid JSON received'
      })
    }

    next()
  })
})

app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
