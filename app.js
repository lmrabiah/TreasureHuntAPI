const express = require('express')
const db = require('./db/models')
const cors = require('cors')
const thingRoutes = require('./api/things/routes')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/things', thingRoutes)

// NOT FOUND PATH MIDDLEWARE
app.use((req, res, next) => {
  console.log("PATH DOESN'T EXIST")
  res.status(404).json({ message: 'PATH NOT FOUND!' })
})

app.use((err, req, res, next) => {
  console.log('🚀 ~ file: app.js ~ line 31 ~ app.use ~ err', err)
  res.status(err.status || 500)
  res.json({ message: err.message || 'Internal Server Error' })
})

const run = async () => {
  try {
    // await db.sequelize.sync();
    await db.sequelize.sync({ alter: true })
    // await db.sequelize.sync({ force: true });
    console.log('Connection to the database successful!')
    app.listen(8000, () => {
      console.log('Hellooo The application is running on localhost:8000')
    })
  } catch (error) {
    console.error('error', error)
  }
}

run()
