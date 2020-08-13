require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));


const port = 8080;


const timesheetsRouter = require('./routes/timesheets')
const employeesRouter = require('./routes/employees')
app.use('/employee-timesheets/api/v1/timesheets/', timesheetsRouter)
app.use('/employee-timesheets/api/v1', employeesRouter);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
