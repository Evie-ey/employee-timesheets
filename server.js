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

const hostname = '127.0.0.1';
const port = 8080;
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`)
})
