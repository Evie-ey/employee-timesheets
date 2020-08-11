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

app.post("/", (req, res)=> {
  if(!req.json) {
    res.status(400);
    res.json({ message: `No parameters were passed`})
  }
  else {
    if(timesheetData < 0) {
      const timesheet = {"id": 1, "Project name": "BoU", "Hours":2, "Description": "Added new names"};
      [...timesheet]
      res.json({message: "New timesheet added."})
    }
    else {
      const timesheet = {
        "id": timesheetData[-1]["id"] + 1,
        "Project name": req.json["Project name"],
        "Hours":req.json["Hours"],
        "Description": req.json["Description"]
      };
      [...timesheet]
    }

  }
})
