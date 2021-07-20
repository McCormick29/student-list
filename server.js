const express = require("express");
const path = require("path");
// require rollbar below
const Rollbar = require('rollbar')
// create the Rollbar class below
const rollbar = new Rollbar({
  accessToken: "c1fcc3dd05b04643a7d86169547db805",
  captureUncaught: true,
  captureUnhandledRejections: true
});

const app = express();
app.use(express.json());
app.use(rollbar.errorHandler())

let studentList = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  // send rollbar some info
  rollbar.info('html file servered succesfully');
});

app.post("/api/student", (req, res) => {
  let { name } = req.body;
  name = name.trim();

  const index = studentList.findIndex((studentName) => {
    return studentName === name;
  });
  const myName = 'Levi'
  if (index === -1 && name !== "") {
    studentList.push(name);
    // add rollbar log here
    rollbar.log('student added successfully', {author: `${myName}`, type: 'manual'})


    res.status(200).send(studentList);
  } else if (name === "") {
    // add a rollbar error here
    rollbar.error('no name given')

    res.status(400).send({ error: "no name was provided" });
  } else {
    // add a rollbar error here too

    res.status(400).send({ error: "that student already exists" });
  }
});
// added code

// app.post('/api/studentDesk', (req, res) => {
//   let studentDesk = req.body
//   const desk = studentList.findIndex((studentDesk) => {
//     for (var in desk) {
//       console.log('studentdesk')
//     }
//     rollbar.error('not a function')
//   })
//   rollbar.error('not a function')
// })

// added code


const port = process.env.PORT || 4545;

// add rollbar errorHandler middleware here
rollbar.error('student already exits');

app.listen(port, () => console.log(`server running on port ${port}`));
