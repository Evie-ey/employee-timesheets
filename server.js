require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient


MongoClient.connect(process.env.DATABASE_URL, { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db('employee-timesheets')
    console.log('connected to database')
  })
  .catch((err) => console.error(err))


const port = 8080;
app.use(bodyParser.urlencoded({ extended: false }));

const timesheetsRouter = require('./routes/timesheets')
app.use('/timesheets', timesheetsRouter)
app.use('/', timesheetsRouter)


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
