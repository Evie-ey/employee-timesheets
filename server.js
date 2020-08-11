const http = require('http');
const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 8080;

const timesheetData = [{"id": 1, "Project name": "BoU", "Hours":2, "Description": "Added new names"}, {"id": 2, "project name": "Emata", "hours":3, "description": "Added new names"}]

app.get('/timesheets', (req, res) => {
  res.json(timesheetData);
});

app.get('/timesheets/:id([0-9]{1,})', (req, res) => {
  const timesheetId = req.params.id;
  const timesheet = timesheetData.filter((timesheet) => {
    return timesheet.id == timesheetId
  });

  if(timesheet.length > 0) {
    res.json(timesheet[0])
  } else {
    res.status(404);
    res.json({ message: `Timesheet ${timesheetId} doesn't exist`})
  }
});




const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`)
})
